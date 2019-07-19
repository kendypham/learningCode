import { Component, OnInit, VERSION } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/shared/models/product";
import { NavbarFooterService } from "src/app/shared/services/nav-bar-footer.service";
import { ThemeService } from "src/app/shared/services/theme.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { AuthService } from "../../shared/services/auth.service";
import { ProductService } from "../../shared/services/product.service";
import { StorageService } from "../../shared/services/storage.service";
import { TranslateService } from "../../shared/services/translate.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;
  allProducts: Product[] = [];
  product = {
    name: "",
    categoryId: ""
  };
  querry = "";
  productUrl = "";
  constructor(
    public authService: AuthService,
    public storageService: StorageService,
    private router: Router,
    public productService: ProductService,
    public translate: TranslateService,
    private themeService: ThemeService,
    public navbarFooterService: NavbarFooterService,
    private toasterService: ToastrService,
  ) {

  }

  ngOnInit() {

  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  setLang(lang: string) {
    this.translate.use(lang).then(() => { });
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }

  searchNav() {
    var data = this.querry;
    this.querry = " ";
    this.router.navigate(["products/search"], { queryParams: { q: data } });
  }

}
