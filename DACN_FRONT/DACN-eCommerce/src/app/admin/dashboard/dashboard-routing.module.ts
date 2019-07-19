import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { ProductViewComponent } from "./components/product-view/product-view.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { UserListComponent, AddUserComponent, EditUserComponent } from "./components";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { AnalystComponent } from "./components/analyst/analyst.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { ViewCategoryComponent } from "./components/view-category/view-category.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { OrderListComponent } from "./components/order-list/order-list.component"
import { DirectionsComponent } from "./components/directions/directions.component";
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "",
        component: AnalystComponent
      },
      {
        path: "view-user",
        component: UserListComponent
      },
      {
        path: "add-user",
        component: AddUserComponent
      },
      {
        path: "view-product",
        component: ProductViewComponent
      },
      {
        path: "add-product",
        component: AddProductComponent
      },
      {
        path: "edit-user/:id",
        component: EditUserComponent
      },
      {
        path: "edit-product/:id",
        component: EditProductComponent
      },
      {
        path: "view-category",
        component: ViewCategoryComponent
      },
      {
        path: "add-category",
        component: AddCategoryComponent
      },
      {
        path: "edit-category/:id",
        component: EditCategoryComponent
      },
      {
        path: "view-order",
        component: OrderListComponent
      },
      {
        path: "directions",
        component: DirectionsComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
