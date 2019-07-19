import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { find } from "node_modules/lodash";
import { Product } from "src/app/shared/models/product";
import { CommonUtilsService } from "src/app/shared/services/common-utils.service";
import { isNullOrUndefined } from "util";
import { Category } from "../../../../shared/models/Category";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SpinnerOverlayAdminService } from "../../../../shared/spinner-overlay-admin/spinner-overlay-admin.service";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.scss"]
})
export class EditProductComponent implements OnInit {
  updateProduct: Product;
  listProducts: Array<Product> = [];
  listCategories: Array<Category> = [];
  loading = false;
  interval: any = null;
  selectedFile: File[] = [];
  isChecked = 0;
  id = "";
  save = null
  imgProduct: any[] = [];
  fileUrl: any[] = [];
  constructor(
    private router: Router,
    private productService: ProductService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private sp: SpinnerOverlayAdminService,
    private common: CommonUtilsService
  ) { }
  tools: object = {
    items: ["Undo", "Redo", "|",
      "Bold", "Italic", "Underline", "StrikeThrough", "|",
      "FontName", "FontSize", "FontColor", "BackgroundColor", "|",
      "SubScript", "SuperScript", "|",
      "LowerCase", "UpperCase", "|",
      "Formats", "Alignments", "|", "OrderedList", "UnorderedList", "|",
      "Indent", "Outdent", "|", "CreateLink", "CreateTable", , "|", "ClearFormat", "SourceCode", "|", "FullScreen"]
  };
  quickTools: object = {
    image: [
      "Replace", "Align", "Caption", "Remove", "InsertLink", "-", "Display", "AltText", "Dimension"]
  };
  ngOnInit() {
    this.sp.show("Loading data...");
    this.interval = setInterval(() => {
      if (isNullOrUndefined(this.common.categorys)) return;
      this.listCategories = this.common.categorys;
      this.updateProduct = new Product();
      this.id = this.route.params["value"].id
      this.getDetail(this.id);
      clearInterval(this.interval);
    }, 300);
  }

  getDetail(id) {
    this.productService.getProductDetail(id)
      .subscribe(item => {
        if (!item) this.toastService.error("Get data error", "error")
        else {
          this.updateProduct = this.onGetCategoryName(item);
          console.log(this.updateProduct);
          this.loading = true;
          this.imgProduct = [].concat(item.images);
          this.save = Object.assign({}, item.images)
          this.toastService.success("Get data successful", "");
          console.log("imgProduct", this.imgProduct);
        }
        this.sp.hide();

      }, (err) => {
        this.sp.hide();
        console.log(err);
        this.toastService.error("Error", err.statusText)
      });
  }
  showImage = () => {
    return this.imgProduct[0] ? this.imgProduct[0].url : "";
  }
  onGetCategoryName(product) {
    const temp = find(this.listCategories, val => val.id === product.categoryId);
    if (temp !== undefined) {
      product.categoryName = temp.name;
    }
    return product;
  }

  updateProductDetail(updateProductForm: NgForm) {
    // if (this.isChecked == 2) {
    //   console.log("chay vao 2",updateProductForm.value)
    //   const formData: FormData = new FormData();
    //   updateProductForm.value.imageLinks = undefined;
    //   formData.append("data", JSON.stringify(updateProductForm.value));
    //   for (let i = 0; i < this.selectedFile.length; i++) {
    //     formData.append("productImg", this.selectedFile[i]);
    //   }
    //   this.productService.updateProduct(formData)
    //     .subscribe(data => {
    //       console.log("formdata", data);
    //       this.toastService.success("Update successful", "");
    //       this.router.navigate(["/admin/dashboard/view-product"]);
    //     }, (err) => {
    //       console.log("error", err);
    //       this.toastService.error("Error while update product", err);
    //     });
    // } else if(this.isChecked == 1){
    //   const linkArray = updateProductForm.value.imageLinks.split(",");
    //   updateProductForm.value.imageLinks = [].concat(linkArray);
    //   updateProductForm.value.productImg = undefined;
    //   console.log("chay vao 1",updateProductForm.value)
    //   const formData: FormData = new FormData();
    //   formData.append("data", JSON.stringify(updateProductForm.value));
    //   this.productService.updateProduct(formData)
    //     .subscribe(data => {
    //       console.log("form", data);
    //       this.toastService.success("Update successful", "");
    //       this.router.navigate(["/admin/dashboard/view-product"]);
    //     }, (err) => {
    //       console.log("error", err);
    //       this.toastService.error("Error while update product", err);
    //     });
    // }
    // else
    if (this.isChecked === 0) {
      console.log("chay vao 0", updateProductForm.value)
      const mData = {
        id: this.id,
        name: updateProductForm.value.name,
        price: updateProductForm.value.price,
        categoryId: updateProductForm.value.categoryId,
        quantity: updateProductForm.value.quantity,
        seller: updateProductForm.value.seller,
        description: updateProductForm.value.description,
      }
      let c = []
      for (let i = 0; i < this.imgProduct.length; i++)
        c.push(this.imgProduct[i].id)
      console.log("C triggers", c);
      const params = {
        id: this.id,
        oldImgUrls: c,
        //Danh sách các  id image còn lại ( nếu user xoá bớt thì xoá những id đó đi).
      }

      const formData: FormData = new FormData();
      console.log(this.selectedFile[0]);
      formData.append("data", JSON.stringify(params));
      for (let i = 0; i < this.selectedFile.length; i++) {
        console.log(this.selectedFile[i]);
        formData.append("updateImg", this.selectedFile[i]);
      }
      if (this.selectedFile.length > 0 || this.save.length !== this.imgProduct.length) {
        this.productService.updateProductImage(formData)
          .subscribe(data => {
            console.log("formDATA", data);
            this.toastService.success("Update image successful", "");
            this.productService.updateProduct(mData)
              .subscribe(data => {
                console.log("form", data);
                this.toastService.success("Update successful", "");
                this.router.navigate(["/admin/dashboard/view-product"]);
              }, (err) => {
                console.log("error", err);
                this.toastService.error("Error while update product", err);
              });
          }, (err) => {
            console.log("error", err);
            this.toastService.error("Error while update image product", err);
          })
      } else {
        this.productService.updateProduct(mData)
          .subscribe(data => {
            console.log("form", data);
            this.toastService.success("Update successful", "");
            this.router.navigate(["/admin/dashboard/view-product"]);
          }, (err) => {
            console.log("error", err);
            this.toastService.error("Error while update product", err);
          });
      }
    }
  }


  onFileSelected(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.selectedFile.push(<File>event.target.files[i]);
    }
    this.getImageUrl();
  }

  getImageUrl() {
    this.fileUrl = [];
    if (this.selectedFile) {
      for (let file of this.selectedFile) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileUrl.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }

  onRemoveFile(type, index) {
    if (this.imgProduct.length + this.selectedFile.length > 1) {
      switch (type) {
        case "oldImg":
          this.imgProduct.splice(index, 1);
          break;
        case "newImg":
          this.fileUrl.splice(index, 1);
          this.selectedFile.splice(index, 1);
          break;
      }
    }
  }
}
