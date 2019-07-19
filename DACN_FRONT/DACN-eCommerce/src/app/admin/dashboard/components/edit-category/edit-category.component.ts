import { Component, OnInit } from "@angular/core";
import {Category} from "../../../../shared/models/Category";
import {CategoryService} from "../../../../shared/services/category.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare var toastr: any;
@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"]
})
export class EditCategoryComponent implements OnInit {

  category: Category = new Category();
  loading = false;
  private sub: any;
  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      const id = params["id"];
      this.getDetail(id);
    });
  }


  getDetail(id) {
    this.categoryService.getCategoryById(id)
      .subscribe(data => {
        this.category = data;
        this.loading = true;
      }, (err) => {
        console.log(err);
      });
  }


  updateCategoryDetail(updateForm: NgForm) {
    updateForm.value.id = this.category.id;
    this.categoryService.updateCategory(updateForm.value)
      .subscribe(data => {
        toastr.success("product " + updateForm.value["name"] + "is update successfully", "Update Category");
        this.router.navigate(["/admin/dashboard/view-category"]);
      }, (err) => {
        console.log("error", err);
        this.toasterService.error("Error while update category", err);
      });
  }
}
