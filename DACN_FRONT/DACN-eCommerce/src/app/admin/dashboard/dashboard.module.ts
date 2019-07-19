import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbCarouselModule, NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { FormsModule } from "@angular/forms";
import { StatModule } from "../../shared";
import { TimelineComponent, NotificationComponent, ChatComponent } from "./components";
import { UserListComponent } from "./components/user-list/user-list.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import { ProductViewComponent } from "./components/product-view/product-view.component";
import { AddProductComponent } from "./components/add-product/add-product.component";
import { EditProductComponent } from "./components/edit-product/edit-product.component";
import { OrderModule } from "ngx-order-pipe";
import { FilterPipeModule } from "ngx-filter-pipe";
import { AnalystComponent } from "./components/analyst/analyst.component";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { ViewCategoryComponent } from "./components/view-category/view-category.component";
import { EditCategoryComponent } from "./components/edit-category/edit-category.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { OrderListComponent } from './components/order-list/order-list.component';
import { AnalystService } from "src/app/shared/services/analyst.service";
import { DashboardService } from "../../shared/services/dashboard.service";
import { DirectionsComponent } from "./components/directions/directions.component";
import { AgmCoreModule } from "@agm/core";
import { RichTextEditorAllModule } from "@syncfusion/ej2-angular-richtexteditor";
import { AlertModule } from 'ngx-bootstrap/alert'
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        NgxPaginationModule,
        FormsModule,
        OrderModule,
        AgmCoreModule,
        FilterPipeModule, ChartsModule,
        Ng2SmartTableModule, RichTextEditorAllModule,
        AlertModule.forRoot(), TabsModule.forRoot()
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        UserListComponent,
        AddUserComponent,
        EditUserComponent,
        ProductViewComponent,
        AddProductComponent,
        EditProductComponent,
        AnalystComponent,
        AddCategoryComponent,
        ViewCategoryComponent,
        EditCategoryComponent,
        OrderListComponent,
        DirectionsComponent,
    ],
    exports: [AgmCoreModule],
    providers: [AnalystService, DashboardService],
})
export class DashboardModule { }
