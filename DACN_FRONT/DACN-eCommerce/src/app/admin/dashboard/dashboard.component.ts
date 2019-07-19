import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SpinnerOverlayAdminService } from 'src/app/shared/spinner-overlay-admin/spinner-overlay-admin.service';
import { routerTransition } from '../../router.animations';
import { DashboardService } from "../../shared/services/dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  alerts: Array<any> = [];
  sliders: Array<any> = [];

  constructor(public dashboardService: DashboardService,
    private sp: SpinnerOverlayAdminService) {
  }

    ngOnInit() {
        this.sp.show("Loading data...");
        console.log("Chay vo dashboard")
        this.dashboardService.title = 'Dashboard'
    }

    ngAfterViewInit(): void {
      setTimeout(() => {
          this.sp.hide();
      }, 6000);
  }

}
