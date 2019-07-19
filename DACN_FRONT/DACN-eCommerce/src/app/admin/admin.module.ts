import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Ng2SmartTableModule } from "ng2-smart-table";
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        "/start-angular/SB-Admin-BS4-Angular-6/master/dist/assets/i18n/",
        ".json"
    ); */
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};
@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslateModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        NgbDropdownModule,
        Ng2SmartTableModule,
    ],
    declarations: [AdminComponent, SidebarComponent, HeaderComponent],
})
export class AdminModule { }
