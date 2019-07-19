import { AgmCoreModule } from "@agm/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { AngularFireModule } from "angularfire2";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { NgxContentLoadingModule } from "ngx-content-loading";
import { OwlModule } from "ngx-owl-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { FireBaseConfig } from "../../environments/firebaseConfig";
import { CardLoaderComponent } from "./components/card-loader/card-loader.component";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { NoProductsFoundComponent } from "./components/no-products-found/no-products-found.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { FilterByPricePipe } from "./pipes/filterByPrice.pipe";
import { MomentTimeAgoPipe } from "./pipes/moment-time-ago.pipe";
import { TranslatePipe } from "./pipes/translate.pipe";
import { AuthService } from "./services/auth.service";
import { CarrierService } from "./services/carrier.service";
import { ProductCommand, UserCommand } from "./services/command";
import { CommonUtilsService } from "./services/common-utils.service";
import { OrderService } from "./services/order.service";
import { ProductService } from "./services/product.service";
import { SocketService } from "./services/socket.service";
import { SpinnerOverlayAdminModule } from "./spinner-overlay-admin/spinner-overlay-admin.module";
import { SpinnerOverlayAdminService } from "./spinner-overlay-admin/spinner-overlay-admin.service";
import { SpinnerOverlayModule } from "./spinner-overlay/spinner-overlay.module";
import { SpinnerOverlayService } from "./spinner-overlay/spinner-overlay.service";
import { SpinnerModule } from "./spinner/spinner.module";
import { AdminAuthGuard, AuthGuard } from "./_guards";
@NgModule({
	imports: [
		CommonModule,
		OverlayModule,
		MDBBootstrapModule.forRoot(),
		AngularFireModule.initializeApp(FireBaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		FormsModule,
		HttpClientModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		SpinnerModule,
		SpinnerOverlayModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
		}),
		NgxContentLoadingModule,
		ReactiveFormsModule,
		SpinnerOverlayAdminModule
	],
	declarations: [
		NoProductsFoundComponent,
		FilterByBrandPipe,
		FilterByPricePipe,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		CardLoaderComponent,
		MomentTimeAgoPipe,
	],
	exports: [
		NoProductsFoundComponent,
		FormsModule,
		MDBBootstrapModule,
		AngularFireModule,
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		FormsModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		FilterByBrandPipe,
		FilterByPricePipe,
		AgmCoreModule,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		MomentTimeAgoPipe,
		NgxContentLoadingModule,
		CardLoaderComponent,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule, ScrollingModule, ReactiveFormsModule,
		SpinnerModule,
	],
	providers: [CommonUtilsService, ProductCommand, AuthService, UserCommand, AuthGuard, AdminAuthGuard, ProductService, FormBuilder,
		SpinnerOverlayService, NgxContentLoadingModule, SpinnerOverlayAdminService, CarrierService, OrderService, SocketService]
})
export class SharedModule { }
