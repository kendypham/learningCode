import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { Category } from "src/app/shared/models/Category";
import { CommonUtilsService } from "src/app/shared/services/common-utils.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { isNullOrUndefined } from "util";
import { Product } from "../../../shared/models/product";
import { AuthService } from "../../../shared/services/auth.service";
import { ProductService } from "../../../shared/services/product.service";
import {union} from "node_modules/lodash";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, AfterViewInit {
  @Input() title: string = "All";
  @Input() brands: Array<any> = [];
  @Input() selectedBrand: string = "All";
  @Input() prices: Array<any> = [
    "All",
    "Under 1m",
    "1m - 3m",
    "3m - 6m",
    "6m - 10m",
    "10m - 15m",
    "Over 15m"
  ];
  @Input() categoryId: string = null;
  @Input() page = 1;
  @Input() itemsPerPage = 8;
  selectedPrice: any = "All";
  imageLinkNull: string = "https://via.placeholder.com/150x200";
  options: Product[] = [];
  loading = false;
  interval: any = null;
  categoryList: Category[] = [];
  private _dataProvider: Product[] = [];
  cartProducts: any[] = [];
  get dataProvider() {
    return this._dataProvider;
  }
  @Input() set dataProvider(val: any) {
    this.options = val;
  }

  /**
   *
   * @param authService
   * @param productService
   * @param toasterService
   */
  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private toasterService: ToastrService,
    private common: CommonUtilsService,

  ) {

  }

  ngOnInit() {
    this.getCartItem();
  }
  ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      if (isNullOrUndefined(this.common.categorys)) return;
      this.categoryList = this.common.categorys;
      this.init();
      if (this.title !== "All" && !this.categoryId) { } else {
        this.getProductByCategory();
      }
      clearInterval(this.interval);
    }, 300);
  }

  init = (): any => {
    if (this.title === "All") return;
    for (const category of this.common.categorys) {
      if (String(category.name).toLowerCase() === this.title.toLowerCase()) {
        this.categoryId = category.id;
      }
    }
  }

  updateSelectedBrand(brand: string) {
    this.selectedBrand = brand;
  }

  updateSelectedPrice(price: any) {
    this.selectedPrice = price;
  }

  getProductByCategory = (): void => {
    this.brands = []
    this.loading = true;
    this.dataProvider = [];
    this.productService.getProductByCategory(this.categoryId)
      .subscribe(data => {
        console.log(data);
        this.loading = false;
        data.map(item => {
          item.description = this.common.parsePlainTextFromHTML(item.description)
          return item
        })
        this.dataProvider = data;
        for (const product of this.options) {
          if (this.brands.indexOf(product.seller) === -1) {
            this.brands.push(product.seller);
          }
        }
        this.brands = union(this.brands);
      }, (err) => {
        console.log("error", err);
        this.toasterService.error("Error while fetching Products", err);
      });
  }

  /**
   * removeProduct
   * @param key
   */
  removeProduct(key: string) {
    this.productService.deleteProductById(key)
      .subscribe(data => {
        console.log(data);

      }, (err) => {
        console.log("error", err);
        this.toasterService.error("Error while deleting Products", err);
      });
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
            this.toasterService.wait("Adding Product to Cart", "Product Adding to the cart");
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
          this.toasterService.wait("Adding Product to Cart", "Product Adding to the cart");
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
}

