import { AfterViewInit, Component, OnInit } from "@angular/core";
import { CategoryService } from "../shared/services/category.service";
import { CommonUtilsService } from "../shared/services/common-utils.service";
import { isNullOrUndefined } from "util";
import { ToastrService } from "../shared/services/toastr.service";


@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit, AfterViewInit {
    interval: any;
    constructor(public categoryService: CategoryService,
        public common: CommonUtilsService,
        public toasterService: ToastrService,
    ) {
    }

    collapedSideBar: boolean;
    ngAfterViewInit(): void {
        // setTimeout(() => {
        //     this.sp.hide();
        // }, 6000);
    }

    ngOnInit() {
        this.getAllCategorys();
        this.interval = setInterval(() => {
            if (isNullOrUndefined(this.common.categorys)) return;
            clearInterval(this.interval);
        }, 300);
    }
    getAllCategorys(): any {
        this.categoryService.getAllCategorys()
            .subscribe(data => {
                this.common.categorys = data;
            }, (err) => {
                console.log("error", err);
                this.toasterService.error('Error while fetching Products', err);
            });
    }
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
