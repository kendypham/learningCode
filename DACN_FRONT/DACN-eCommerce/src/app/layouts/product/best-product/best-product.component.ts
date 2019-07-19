import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/Category';
import { Product } from 'src/app/shared/models/product';
import { CommonUtilsService } from 'src/app/shared/services/common-utils.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { TranslateService } from 'src/app/shared/services/translate.service';
import { isNullOrUndefined } from 'util';
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.scss']
})
export class BestProductComponent implements OnInit, AfterViewInit {
  @Input() title: string = 'All';
  @Input() categoryId: string = null;
  imageLinkNull: string = "https://via.placeholder.com/150x150";
  @Input() translateTitle: string = "BESTPRODUCTS";
  @Input() viewLink: string = "/products/all-products";
  options: any;
  choice: Product[] = [];
  toggle: boolean = false;
  interval: any = null;
  categoryList: Category[] = [];
  loading = false;
  private _dataProvider: Product[] = [];
  get dataProvider() {
    return this._dataProvider;
  }
  @Input() set dataProvider(val: any) {
    this.choice = val;
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
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.options = {
      dots: false,
      responsive: {
        '0': { items: 1 },
        '430': { items: 2 },
        '550': { items: 3 },
        '670': { items: 4 }
      },
      autoplay: true,
      loop: true,
      autoplayTimeout: 5000,
      lazyLoad: true
    };
  }

  ngAfterViewInit(): void {
    this.interval = setInterval(() => {
      if (isNullOrUndefined(this.common.categorys)) { return; }
      this.categoryList = this.common.categorys;
      this.init();
      if (this.title !== 'All' && !this.categoryId) { } else {
        this.getProductByCategory();
      }
      clearInterval(this.interval);
    }, 300);
  }

  init = (): any => {
    if (this.title === "All") { return; };
    for (const category of this.common.categorys) {
      if (String(category.name).toLowerCase() === this.title.toLowerCase()) {
        this.categoryId = category.id;
      }
    }
  }

  getProductByCategory = (): void => {
    this.loading = true;
    this.dataProvider = [];
    this.productService.getProductByCategory(this.categoryId)
      .subscribe(data => {
        this.loading = false;
        data.map(item => {

          item.description = this.common.parsePlainTextFromHTML(item.description)
          return item
        })
        this.dataProvider = data;
      }, (err) => {
        this.toasterService.error("Error while fetching Products", err);
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
}
