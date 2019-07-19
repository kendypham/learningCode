import { Component, OnInit } from "@angular/core";
import { NavbarFooterService } from "src/app/shared/services/nav-bar-footer.service";
import { CategoryService } from "src/app/shared/services/category.service";
import { CommonUtilsService } from "src/app/shared/services/common-utils.service";
import { ToastrService } from "src/app/shared/services/toastr.service";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  interval: any;
  constructor(
    public navbarFooterService: NavbarFooterService,
    public categoryService: CategoryService,
    public common: CommonUtilsService,
    public toasterService: ToastrService,
  ) {
    navbarFooterService.show();
  }
  ngOnInit() {
    this.getAllCategorys();
    this.interval = setInterval(() => {
      if (isNullOrUndefined(this.common.categorys)) return;
      clearInterval(this.interval);
    }, 300);
  }

  getAllCategorys(): any {
    this.categoryService.getAllCategorys()
      .subscribe(data => {
        this.common.categorys = data;
      }, (err) => {
        console.log("error", err);
        this.toasterService.error('Error while fetching Products', err);
      });
  }
}
