import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ToastrService } from './../../../shared/services/toastr.service';
@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss']
})
export class CartProductsComponent implements OnInit {
  cartProducts: any[] = [];
  tempCollection: any[] = [];
  showDataNotFound = true;
  temp: number;
  imageLinkNull: string = "https://via.placeholder.com/150x200";
  // Not Found Message
  messageTitle = 'No Products Found in Cart';
  messageDescription = 'Please, Add Products to Cart';

  constructor(public productService: ProductService,
    private toasterService: ToastrService) { }

  ngOnInit() {
    this.getCartItem();
  }

  getCartItem() {
    this.productService.getOrderItem()
      .subscribe(data => {
        console.log(data);
        this.productService.calculateCartProdCounts();
        this.cartProducts = [];
        for (let product of data) {
          if (product.inCart == true)
            this.cartProducts.push(product);
        }
      }, err => {
        console.log(err);
      });
  }

  removeCartItem(id: any) {
    this.productService.removeOrderItem(id)
      .subscribe(data => {
        this.getCartItem();
        this.productService.calculateCartProdCounts();
      }, err => console.log(err));
  }

  changeQuantity(e) {
    if (e.target.value <= 0) {
      this.toasterService.wait('Invalid Quantity', 'Invalid Quantity');
      this.getCartItem();
    }
    else {
      let tmp = {
        id: e.target.id,
        quantity: e.target.value
      }
      this.productService.updateOrderItem(tmp)
        .subscribe(data => {
          this.getCartItem();
          this.productService.calculateCartProdCounts();
          this.toasterService.wait('Adding Product to Cart', 'Product Adding to the cart');
        }, err => {
          console.log(err);
        });
    }
  }
}
