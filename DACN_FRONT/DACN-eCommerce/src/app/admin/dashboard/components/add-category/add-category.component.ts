import { Component, OnInit } from '@angular/core';
import {Category} from "../../../../shared/models/Category";
import {CategoryService} from "../../../../shared/services/category.service";
import {ToastrService} from "../../../../shared/services/toastr.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

declare var toastr: any;
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category: Category = new Category();
  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  
  
  createCategory(categoryForm: NgForm) {
    console.log(categoryForm.value);
      this.categoryService.createCategory(categoryForm.value)
        .subscribe(data => {
          console.log("formdata", data);
          toastr.success("category " + categoryForm.value["name"] + "is added successfully", "Product Creation");
          this.router.navigate(["/admin/dashboard/view-category"]);
        }, (err) => {
          console.log("error", err);
          this.toasterService.error("Error while adding product", err);
        });

  }

}
