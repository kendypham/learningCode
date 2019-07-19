import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "../../../../shared/models/Category";
import { CategoryService } from "../../../../shared/services/category.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SpinnerOverlayAdminService } from "../../../../shared/spinner-overlay-admin/spinner-overlay-admin.service";
@Component({
  selector: "app-view-category",
  templateUrl: "./view-category.component.html",
  styleUrls: ["./view-category.component.scss"]
})
export class ViewCategoryComponent implements OnInit {

  Categories: Category[] = [];
  page: number = 1;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private sp: SpinnerOverlayAdminService,
    private toastService: ToastrService,
  ) { }


  settings = {
    columns: {
      index: {
        title: "#",
        actions: {
          add: false,
          edit: false,
        },
        filter: false
      },
      name: {
        title: "Category Name",
        actions: {
          add: false,
          edit: false,
        },
        width: "40%"
      },
      description: {
        title: "Description",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
        width: "50%"
      }
    },
    actions: {
      add: false,
      width: "10%",
      position: "right"
    },
    mode: "external",
    edit: {
      editButtonContent: '<i class="fa fa-pencil ml-1 mr-3" aria-hidden="true" ></i>'
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash" aria-hidden="true" ></i>'
    }
  };

  ngOnInit() {
    this.sp.show("Loading data...");
    this.categoryService.getAllCategorys()
      .subscribe(category => {
        this.Categories = category;
        this.sp.hide();
        this.toastService.success("Get data successful", "");
      }, err => {
        this.sp.hide();
        this.toastService.error("Get data error", "error")
      });
  }

  onEdit(event: any): void {
    this.router.navigate(["/admin/dashboard/edit-category/" + event.data.id]);
  }

  onDelete(event: any) {
    this.categoryService.deleteCategory(event.data.id)
      .subscribe(data => {
        console.log(data);
        this.Categories.splice(event.index, 1);
      }, (err) => {
        console.log(err);
      });
  }
}
