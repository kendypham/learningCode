import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { Product } from '../../../shared/models/product';
import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { ProductCommentComponent } from "../product-comment/product-comment.component";
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  @ViewChild(ProductCommentComponent)
  productCommentComponent: ProductCommentComponent
  @ViewChild('decription') decription: ElementRef;


  private sub: any;
  product: Product;
  cartProducts: any[] = [];
  categoryName: any;
  showImage: any;
  productImg: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastrService: ToastrService
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params['id']; // (+) converts string 'id' to a number
      this.productCommentComponent.setProductId = id;
      this.getProductDetail(id);
      this.getCartItem();
      console.log(this.product);
    });
  }


  getProductDetail(id: string) {
    this.productService.getProductDetail(id)
      .subscribe(data => {
        const y = data;
        y['id'] = data.id;
        y['id'] = data.id;
        y['name'] = data.name;
        y['categoryId'] = data.categoryId;
        this.categoryService.getCategoryById(data.categoryId).subscribe(data => {
          this.categoryName = data.name;
        })
        y['price'] = data.price;
        y['description'] = data.description;
        if (data.images.length != 0) {
          this.productImg = data.images;
          y['images'] = data.images[0].url;
        }
        y['productQuatity'] = data.quantity;
        y['createdAt'] = data.createdAt;
        y['seller'] = data.seller;
        console.log("productImg", this.productImg);
        console.log(data);
        this.product = y;
        this.showImage = this.productImg[0].url;
        this.decription.nativeElement.innerHTML = this.product.description;
        this.toastrService.success('Fetch data successful', "");
      }, (err) => {
        console.log(err);
        this.toastrService.error('Error while fetching Product Detail', err);
      });

  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  createItem(product: Product) {
    console.log(product);
    var flag = 0;
    let a: any = {
      productId: "",
      quantity: 0
    };
    a.productId = product.id;
    a.quantity = 1;
    for (let i of this.cartProducts) {
      if (i.productId == product.id) {
        flag = 1;
        let tmp = {
          id: i.id,
          quantity: i.quantity + 1
        }
        this.productService.updateOrderItem(tmp)
          .subscribe(data => {
            this.getCartItem();
            this.productService.calculateCartProdCounts();
            this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
          }, err => {
            console.log(err);
          });
        break;
      }
    }
    if (flag == 0) {
      this.productService.createOrderItem(a)
        .subscribe(data => {
          this.getCartItem();
          this.productService.calculateCartProdCounts();
          this.toastrService.wait('Adding Product to Cart', 'Product Adding to the cart');
        }, err => {
          console.log(err);
        });
    }

  }

  getCartItem() {
    this.productService.getOrderItem()
      .subscribe(data => {
        this.cartProducts = [];
        for (let product of data) {
          if (product.inCart == true)
            this.cartProducts.push(product);
        }
      }, err => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  selectedImg(image) {
    console.log(image);
    this.showImage = image.url;
  }

  favouriteClicked(product: Product) {
    if (product.favourite) {
      product.favourite = false;
      this.productService.removeLocalFavourite(product);
    } else {
      product.favourite = true;
      this.productService.addFavouriteProduct(product);
    }
  }

}
