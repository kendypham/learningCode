import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrierService } from '../../../../shared/services/carrier.service';
import { NavbarFooterService } from "../../../../shared/services/nav-bar-footer.service";

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss']
})
export class ShippingDetailsComponent implements OnInit {
  // userDetails: User;

  // userDetail: UserDetail;

  // products: Product[];
  carrier: any[];
  carrierServiceItem: any[] = [];
  data: any = {};
  test: any;
  isChecked: any;
  method = {
    COD: "Thanh toán tiền mặt khi nhận hàng",
    Gateway: "Thanh toán bằng MoMo",
    Online: "Thẻ ATM nội địa/Internet Banking (Miễn phí thanh toán)"
  }
  paymentMethod: any[] = [];
  paymentKey: any = [];
  payCheck: any;
  constructor(
    public navbarFooterService: NavbarFooterService,
    private carrierService: CarrierService,
    private router: Router,

  ) {
    document.getElementById('productsTab').style.display = 'none';
    document.getElementById('shippingTab').style.display = 'block';
    document.getElementById('productsTab').style.display = 'none';
    document.getElementById('resultTab').style.display = 'none';
    navbarFooterService.show();
  }

  ngOnInit() {
    this.getCarrier();
    this.paymentMethod = Object.values(this.method);
    this.paymentKey = Object.keys(this.method);
    console.log(this.paymentKey);
  }

  continueCheckout(form: NgForm) {
    this.data.carrierId = this.carrier[0].id;
    this.data.carrierServiceId = this.isChecked;
    console.log("data", this.data);
    this.router.navigate(['checkouts', { outlets: { checkOutlet: ['billing-details'] } }], {
      queryParams: {
        carrierId: this.data.carrierId, carrierServiceId: this.data.carrierServiceId, payMethod: this.payCheck
      }
    });
  }

  getCarrier() {
    this.carrierService.getCarrier()
      .subscribe(data => {
        this.carrier = [].concat(data);
        for (let i of this.carrier) {
          for (let j of i.services) {
            this.getCarrierServiceById(j.id);
          }
        }
      }, err => {
        console.log(err);
      })
  }

  getCarrierServiceById(id: any) {
    this.carrierService.getCarrierServiceById(id)
      .subscribe(data => {
        this.carrierServiceItem.push(data);

      }, err => {
        console.log(err);
      })
  }

  onCheck(event) {
    this.isChecked = event.target.attributes.getNamedItem('ng-reflect-value').value;
  }

  onPayCheck(event) {
    this.payCheck = event.target.attributes.getNamedItem('ng-reflect-value').value;
    console.log(this.payCheck);
  }
}
