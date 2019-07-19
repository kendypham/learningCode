import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL_MAIN } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class CarrierCommand {
  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  getCarrier() {
    return this.http.get<any>(this.apiUrl + "carrier");
  }

  createCarrier(data: any) {
    return this.http.post<any>(this.apiUrl + "carrier/create", data);
  }

  getCarrierService() {
    return this.http.get<any>(this.apiUrl + "carrier-service");
  }

  getCarrierServiceById(id: any) {
    return this.http.get<any>(this.apiUrl + "carrier-service/" + id);
  }



}
