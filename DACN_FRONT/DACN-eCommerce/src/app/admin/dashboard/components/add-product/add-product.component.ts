import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { HtmlEditorService, ImageService, LinkService, QuickToolbarService, TableService, ToolbarService } from "@syncfusion/ej2-angular-richtexteditor";
import { isNullOrUndefined } from "util";
import { CommonUtilsService } from "../../../../../app/shared/services/common-utils.service";
import { ProductService } from "../../../../../app/shared/services/product.service";
import { Category } from "../../../../shared/models/Category";
import { Product } from "../../../../shared/models/product";
import { ToastrService } from "../../../../shared/services/toastr.service";


declare var toastr: any;

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService],

})
export class AddProductComponent implements OnInit, AfterViewInit {
  product: Product = new Product();
  categoryList: Array<Category> = [];
  selectedFile: File[] = [];
  interval: any;
  isChecked: number = 1;

  tools: object = {
    items: ['Undo', 'Redo', '|',
      'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
      'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
      'SubScript', 'SuperScript', '|',
      'LowerCase', 'UpperCase', '|',
      'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
      'Indent', 'Outdent', '|', 'CreateLink', 'CreateTable', , '|', 'ClearFormat', 'SourceCode', '|', 'FullScreen']
  };
  quickTools: object = {
    image: [
      'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
  };
  constructor(
    private toasterService: ToastrService,
    private productService: ProductService,
    public common: CommonUtilsService,
    private router: Router,

  ) {

  }

  ngOnInit() {
    this.interval = setInterval(() => {
      if (isNullOrUndefined(this.common.categorys)) return;
      if (this.common.categorys[0])
        this.product.categoryId = this.common.categorys[0].id
      clearInterval(this.interval);
    }, 300);
  }

  ngAfterViewInit(): void {
  }

  createProduct(productForm: NgForm) {
    console.log(productForm.value);
    // if (this.isChecked == 2) {
    const formData: FormData = new FormData();
    formData.append("data", JSON.stringify(productForm.value));
    for (let i = 0; i < this.selectedFile.length; i++) {
      console.log(this.selectedFile[i]);
      formData.append("productImg", this.selectedFile[i]);
    }
    this.productService.createProduct(formData)
      .subscribe(data => {
        console.log("formdata", data);
        toastr.success("product " + productForm.value["name"] + "is added successfully", "Product Creation");
        this.router.navigate(["/admin/dashboard/view-product"]);
      }, (err) => {
        console.log("error", err);
        this.toasterService.error("Error while adding product", err);
      });
    // }
    // else {
    //   var linkArray = productForm.value.imageLinks.split(",");
    //   productForm.value.imageLinks = [].concat(linkArray);
    //   const formData: FormData = new FormData();
    //   formData.append("data", JSON.stringify(productForm.value));
    //   this.productService.createProduct(formData)
    //     .subscribe(data => {
    //       console.log("form", data);
    //       toastr.success("product " + productForm.value["name"] + "is added successfully", "Product Creation");
    //       this.router.navigate(["/admin/dashboard/view-product"]);
    //     }, (err) => {
    //       console.log("error", err);
    //       this.toasterService.error("Error while adding product", err);
    //     });
    // }
  }

  onFileSelected(event) {
    this.selectedFile = []

    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(<File>event.target.files[i]);
    }
  }

  onCheck(event) {
    this.isChecked = event.target.value;
    console.log(this.isChecked);
  }

}
