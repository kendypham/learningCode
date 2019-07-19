import { Injectable } from '@angular/core';
import { DashboardCommand } from './command/dashboard';

@Injectable()
export class DashboardService {

    _title: string = "dashboard"

    get title(): string {
        return this._title;
    }
    set title(value) {
        this._title = value
    }

    constructor(
        private dashboardCommand: DashboardCommand
    ) {

    }
    smartShippingDirections(data: any) {
        return this.dashboardCommand.smartShippingDirections(data);
    }
    manualShippingDirections(data: any) {
        return this.dashboardCommand.manualShippingDirections(data);
    }
}
