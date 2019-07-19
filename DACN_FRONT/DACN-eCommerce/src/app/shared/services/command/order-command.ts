import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL_MAIN } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class OrderCommand {
  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  createOrderItem(data: any): any {
    console.log("order", data);
    return this.http.post<any>(this.apiUrl + "order-item/create", data);
  }

  getOrderItem() {
    return this.http.get<any>(this.apiUrl + "order-item/me");
  }

  deleteOrderItem(id: any): any {
    const options: any = {
      body: { id: id }
    };
    return this.http.delete<any>(this.apiUrl + "order-item/delete", options);
  }

  updateOrderItem(data: any): any {
    return this.http.patch<any>(this.apiUrl + "order-item/update", data);
  }

  createOrder(data: any) {
    return this.http.post<any>(this.apiUrl + "order/create", data);
  }

  getOrder() {
    return this.http.get<any>(this.apiUrl + "order/me");
  }

  getAllOrder() {
    return this.http.get<any>(this.apiUrl + "order");
  }

  updateOrder(data: any) {
    return this.http.post<any>(this.apiUrl + "order/update-list", data);
  }
}
