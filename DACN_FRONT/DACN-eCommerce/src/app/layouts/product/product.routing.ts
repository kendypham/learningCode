import { CartProductsComponent } from './cart-products/cart-products.component';
import { FavouriteProductsComponent } from './favourite-products/favourite-products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductComponent } from './product.component';
import { TabletListComponent } from './tablet-list/tablet-list.component';
import { LaptopListComponent } from './laptop-list/laptop-list.component';
import { AccessoryListComponent } from './accessory-list/accessory-list.component';
import { PhoneListComponent } from './phone-list/phone-list.component';
import { WatchListComponent } from './watch-list/watch-list.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { SearchProductComponent } from './search-product/search-product.component';

export const ProductRoutes: Routes = [
	{
		path: 'products',
		component: ProductComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-products',
				component: ProductListComponent
			},
			{
				path: 'favourite-products',
				component: FavouriteProductsComponent
			},
			{
				path: 'cart-items',
				component: CartProductsComponent
			},
			{
				path: 'checkouts',
				loadChildren: './checkout/checkout.module#CheckoutModule'
			},
			{
				path: 'product/:id',
				component: ProductDetailComponent
			},
			{
				path: 'tablet-list',
				component: TabletListComponent
			},
			{
				path: 'phone-list',
				component: PhoneListComponent
			},
			{
				path: 'laptop-list',
				component: LaptopListComponent
			},
			{
				path: 'accessory-list',
				component: AccessoryListComponent
			},
			{
				path: 'watch-list',
				component: WatchListComponent
      },
      {
				path: "search",
				component: SearchProductComponent
			},
			{ path: '**', component: PageNotFoundComponent }
		]
	}
];
