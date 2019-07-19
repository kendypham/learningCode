import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CommonUtilsService } from 'src/app/shared/services/common-utils.service';
import { ToastrService } from "src/app/shared/services/toastr.service";
import { Product } from "../../../shared/models/product";
import { NavbarFooterService } from "../../../shared/services/nav-bar-footer.service";
import { ProductService } from "../../../shared/services/product.service";
import { SpinnerOverlayAdminService } from './../../../shared/spinner-overlay-admin/spinner-overlay-admin.service';
@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit, AfterViewInit {
  products: any;
  data: any;
  loading = true;
  imageLinkNull: string = "https://via.placeholder.com/150x200";
  page = 1;
  itemsPerPage = 12;
  constructor(private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    public navbarFooterService: NavbarFooterService,
    private toastrService: ToastrService,
    private sp: SpinnerOverlayAdminService,
    private common: CommonUtilsService, ) {
    navbarFooterService.show();
  }


  ngOnInit() {
    this.sp.show("Loading data ....");
    this.data = this.route.snapshot.queryParamMap.get('q');
    this.productService.searchProduct(this.data)
      .subscribe(data => {
        if (data == undefined) {
          this.products = [];
        }
        else {
          data.map(item => {
            item.description = this.common.parsePlainTextFromHTML(item.description)
            return item
          })
          this.products = data;

        }
        this.sp.hide();
      }, err => {
        console.log(err);
        this.toastrService.error("Search fail", "")
        this.sp.hide();
      })
  }
  ngAfterViewInit(): void {
    this.sp.show("Loading data ....");
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.data = event.url.substr(19, event.url.length);
          this.productService.searchProduct(this.data)
            .subscribe(data => {
              data.map(item => {
                item.description = this.common.parsePlainTextFromHTML(item.description)
                return item
              })
              this.products = data;
              this.sp.hide();
            }, err => {
              this.sp.hide();
              // this.toastrService.error("Search fail", "")
            });
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel
        ) {
          setTimeout(() => {
            this.sp.hide();
          }, 2000);
        }
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
