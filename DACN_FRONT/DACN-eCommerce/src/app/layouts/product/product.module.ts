// Core Dependencies
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StarRatingModule } from "angular-star-rating";
import { CategoryService } from "src/app/shared/services/category.service";
import { SharedModule } from "../../shared/shared.module";
import { AccessoriesComponent } from "./accessories/accessories.component";
import { AccessoryListComponent } from "./accessory-list/accessory-list.component";
import { BestProductComponent } from "./best-product/best-product.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";
import { CartProductsComponent } from "./cart-products/cart-products.component";
// Components
import { CheckoutModule } from "./checkout/checkout.module";
import { FavouriteProductsComponent } from "./favourite-products/favourite-products.component";
import { LaptopListComponent } from "./laptop-list/laptop-list.component";
import { LaptopsComponent } from "./laptops/laptops.component";
import { PhoneListComponent } from "./phone-list/phone-list.component";
import { PhonesComponent } from "./phones/phones.component";
import { ProductCommentComponent } from "./product-comment/product-comment.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductComponent } from "./product.component";
// configuration and services
import { ProductRoutes } from "./product.routing";
import { SearchProductComponent } from './search-product/search-product.component';
import { TabletListComponent } from "./tablet-list/tablet-list.component";
import { TabletsComponent } from "./tablets/tablets.component";
import { WatchListComponent } from "./watch-list/watch-list.component";
import { WatchesComponent } from "./watches/watches.component";



@NgModule({
	imports: [CommonModule, RouterModule.forChild(ProductRoutes), SharedModule, CheckoutModule
		, StarRatingModule.forRoot()],
	declarations: [
		ProductComponent,
		BestProductComponent,
		ProductListComponent,
		ProductDetailComponent,
		FavouriteProductsComponent,
		CartProductsComponent,
		CartCalculatorComponent,
		AccessoriesComponent,
		TabletsComponent,
		WatchesComponent,
		PhoneListComponent,
		TabletListComponent,
		LaptopListComponent,
		AccessoryListComponent,
		WatchListComponent,
		PhonesComponent,
		LaptopsComponent,
		ProductCommentComponent,
		SearchProductComponent
	],
	providers: [CategoryService],

	exports: [BestProductComponent, AccessoriesComponent, TabletsComponent, WatchesComponent,
		PhoneListComponent,
		TabletListComponent,
		LaptopListComponent,
		AccessoryListComponent,
		WatchListComponent,
		PhonesComponent,
		LaptopsComponent]
})
export class ProductModule { }
