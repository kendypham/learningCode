import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { IndexModule } from './index/index.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { TranslateService } from './shared/services/translate.service';
import { ProductModule } from './layouts/product/product.module';
import { UserModule } from './layouts/user/user.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarFooterService } from './shared/services/nav-bar-footer.service';
import { JwtInterceptor } from './shared/_helpers';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { RatingDisplayComponent } from './layouts/rating-display/rating-display.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { AgmCoreModule } from '@agm/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
const config: SocketIoConfig = { url: 'http://localhost:1339', options: { path: '/order/sub-new-orders' } };


/* to load and set en.json as the default application language */
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		IndexModule,
		ProductModule,
		UserModule,
		SharedModule,
		RouterModule.forRoot(AppRoutes),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		SocketIoModule.forRoot(config),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBlvLPHX7SNJcsea6P8DdJCDbQyE1Q-h_U',
			libraries: ["places"]
		}),
		GooglePlaceModule
	],
	providers: [
		TranslateService,
		{
			provide: APP_INITIALIZER,
			useFactory: setupTranslateFactory,
			deps: [TranslateService],
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		},
		NavbarFooterService,
	],
	bootstrap: [AppComponent],
	schemas: [NO_ERRORS_SCHEMA],
	exports: [GooglePlaceModule]
})
export class AppModule { }
