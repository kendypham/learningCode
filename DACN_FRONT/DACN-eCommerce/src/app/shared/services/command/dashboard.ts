import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL_MAIN } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class DashboardCommand {

  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  smartShippingDirections(data: any): any {
    return this.http.post<any>(this.apiUrl + "shipping/smart-shipping-directions", data);
  }
  manualShippingDirections(data: any): any {
    return this.http.post<any>(this.apiUrl + "shipping/manual-shipping-directions", data);
  }

}
