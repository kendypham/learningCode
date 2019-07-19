import { AfterViewChecked, Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { Product } from '../../../../shared/models/product';
import { NavbarFooterService } from "../../../../shared/services/nav-bar-footer.service";
import { OrderService } from '../../../../shared/services/order.service';
import { ProductService } from '../../../../shared/services/product.service';
import { ToastrService } from '../../../../shared/services/toastr.service';

declare var $: any;
declare let paypal: any;
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, AfterViewChecked {
  addScript: boolean = false;
  paypalLoad: boolean = true;
  finalAmount: number = 1;
  products: Product[];
  date: number;
  totalPrice = 0;
  tax = 6.4;
  checkoutProducts: any[];
  orderData: any;
  constructor(public navbarFooterService: NavbarFooterService,
    private orderService: OrderService,
    private productService: ProductService,
    private toastrService: ToastrService) {
    /* Hiding Billing Tab Element */
    document.getElementById('productsTab').style.display = 'none';
    document.getElementById('shippingTab').style.display = 'none';
    document.getElementById('billingTab').style.display = 'none';
    document.getElementById('resultTab').style.display = 'block';
    navbarFooterService.show();

    this.date = Date.now();
  }

  ngOnInit() {
    this.productService.calculateCartProdCounts();
    this.orderService.getOrder()
      .subscribe(data => {
        console.log("data order", data);
        this.orderData = data[data.length - 1];
        this.checkoutProducts = this.orderData.orderItems;
        this.checkoutProducts.forEach((product) => {
          this.totalPrice += product.price * product.quantity;
        });
        console.log("oderData", this.orderData);
        this.finalAmount = Math.round(((this.totalPrice + this.orderData.shipFee) / 23000.00));
        if (this.finalAmount < 1) this.finalAmount = 1;
      }, err => {
        console.log(err);
      })
    this.productService.calculateCartProdCounts();

  }

  downloadReceipt() {
    const data = document.getElementById('receipt');
    // console.log(data);

    html2canvas(data).then((canvas) => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(this.orderData.id + '.pdf'); // Generated PDF
    });
  }

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AXtHyVSlEQQydchXkQd2O2hBShM3gzkXEABiI_Af4O7qckqaNEs56t7LKZzbVt9H4jfW4agHbqRCUk90',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        console.log("update status");
        let orderUpdate = {
          id: this.orderData.id,
          status: "Paid",
          paymentCode: payment.id
        }

        this.orderService.updateOrder(orderUpdate)
          .subscribe(data => {
            this.toastrService.success('Payment is successful', '');
          }, err => {
            this.toastrService.error('Error', 'Payment is error');
            console.log(err);
          })

      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
