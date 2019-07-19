import { Component, OnInit } from '@angular/core';
import { NavbarFooterService } from "../../../../shared/services/nav-bar-footer.service";
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  checkoutProducts: any[];
  data: any[] = [];
  totalPrice = 0;
  constructor(private productService: ProductService,
    public navbarFooterService: NavbarFooterService, ) {
    document.getElementById('shippingTab').style.display = 'none';
    document.getElementById('billingTab').style.display = 'none';
    document.getElementById('resultTab').style.display = 'none';
    navbarFooterService.show();

  }

  ngOnInit() {
    this.productService.getOrderItem()
      .subscribe(data => {
        this.checkoutProducts = [];
        for (let product of data) {
          if (product.inCart == true)
            this.checkoutProducts.push(product);
        }
        this.checkoutProducts.forEach((product) => {
          this.data.push(product.id);
          this.totalPrice += product.price * product.quantity;
        });
      }, err => {
        console.log(err);
      });

  }


}
