import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { BASE_URL_MAIN } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ProductCommand {

  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  getProducts(): any {
    return this.http.get<any>(this.apiUrl + "product");
  }
  getProductsByCategory(categoryId: string): any {
    return this.http.get<any>(this.apiUrl + "product?categoryId=" + categoryId);
  }
  createProduct(data: any): any {
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    const options = { headers: headers };

    return this.http.post<Product>(this.apiUrl + "product/create", data, options);
  }

  getDetail(id: string): any {
    return this.http.get<Product>(this.apiUrl + "product/" + id);
  }

  deleteId(id: any): any {
    const options: any = {
      body: { id: id }
    };
    console.log('option');
    console.log(options);
    return this.http.delete<Product>(this.apiUrl + "product/delete", options);
  }


  updateProduct(data: any): any {

    return this.http.patch<Product>(this.apiUrl + "product/update", data);
  }

  createComment(data: any): any {
    return this.http.post<Product>(this.apiUrl + "rating/create", data);
  }
  getComment(): any {
    return this.http.get<Product>(this.apiUrl + "rating");
  }
  deleteComment(id: any): any {
    const options: any = {
      body: { id: id }
    };
    return this.http.delete<Product>(this.apiUrl + "rating/delete", options);
  }

  searchProduct(data: any): any {
    return this.http.get<any>(this.apiUrl + "search?q=" + data)
  }

  updateImgProduct(data: any) {
    const headers = new HttpHeaders({
      "Content-Type": "multipart/form-data"
    });
    const options = { headers: headers };
    return this.http.post<any>(this.apiUrl + "product/update-images", data, options)
  }
}
