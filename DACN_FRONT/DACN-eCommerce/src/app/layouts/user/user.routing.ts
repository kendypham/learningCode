import { Routes } from '@angular/router';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from 'src/app/shared/_guards';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
	{
		path: 'users',
		component: UserComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: '',
				component: UserAccountComponent,
				outlet: 'profileOutlet'
			},
			{
				path: 'order',
				component: UserOrderComponent,
				outlet: 'profileOutlet'
			},
			{ path: '**', component: PageNotFoundComponent }
		]
	}
];
