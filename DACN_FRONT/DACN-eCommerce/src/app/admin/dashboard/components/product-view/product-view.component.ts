import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { OrderPipe } from "ngx-order-pipe";
import { find } from "node_modules/lodash";
import { Product } from "../../../../shared/models/product";
import { CategoryService } from "../../../../shared/services/category.service";
import { ProductService } from "../../../../shared/services/product.service";
import { ToastrService } from "../../../../shared/services/toastr.service";
import { SpinnerOverlayAdminService } from "../../../../shared/spinner-overlay-admin/spinner-overlay-admin.service";

@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.component.html",
  styleUrls: ["./product-view.component.scss"]
})
export class ProductViewComponent implements OnInit {
  source: LocalDataSource;
  Products: Product[] = [];
  page: number = 1;
  order: string = "product.price";
  sortedCollection: any[];
  selectedProduct: any[] = [];
  reverse: boolean = false;
  constructor(
    private productService: ProductService,
    private categories: CategoryService,
    private orderPipe: OrderPipe,
    private router: Router,
    private sp: SpinnerOverlayAdminService,
    private toastService: ToastrService,
  ) {
    this.sortedCollection = this.orderPipe.transform(this.Products, "product.price");
    this.source = new LocalDataSource(this.Products);
  }

  settings = {
    columns: {
      images: {
        title: "Images",
        type: "html",
        valuePrepareFunction: (value) => {
          if (value.length > 0) {
            return "<img src= " + value[0].url + " width=" + 100 + " height=" + 100 + "  />";
          }
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      name: {
        title: "Product Name",
        actions: {
          add: false,
          edit: false,
        },
      },
      price: {
        title: "Price",
        actions: {
          add: false,
          edit: false,
        },
      },
      seller: {
        title: "Producer",
        actions: {
          add: false,
          edit: false,
        },
      },
      categoryName: {
        title: "Category",
        actions: {
          add: false,
          edit: false,
        },
      },
      quantity: {
        title: "Quantity",
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
      },
      description: {
        title: "Description",
        type: "html",
        valuePrepareFunction: (value) => {
          return value;
        },
        actions: {
          add: false,
          edit: false,
        },
        filter: false,
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
    this.productService.getAllProducts()
      .subscribe(data => {
        this.categories.getAllCategorys()
          .subscribe(category => {
            this.Products = this.onGetCategoryName(data, category);
            this.source = new LocalDataSource(this.Products);
            this.sp.hide();
          });
      }, (err) => {
        this.sp.hide();
        console.log(err);
      });
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }


  onGetCategoryName(product, category) {
    product.map(item => {
      const temp = find(category, val => val.id === item.categoryId);
      if (temp !== undefined) {
        item.categoryName = temp.name;
      }
    });
    console.log(product);
    return product;
  }

  onEdit(event: any): void {
    this.router.navigate(["/admin/dashboard/edit-product/" + event.data.id]);
  }

  onDelete(event: any) {
    this.productService.deleteProductById(event.data.id)
      .subscribe(data => {
        this.toastService.success("Delete product successful", "");
        this.Products.splice(this.Products.indexOf(event.data), 1);
        this.source = new LocalDataSource(this.Products);
        console.log("products after", this.Products);
      }, (err) => {
        this.toastService.error("Delete user error", "");
      });
  }
}
