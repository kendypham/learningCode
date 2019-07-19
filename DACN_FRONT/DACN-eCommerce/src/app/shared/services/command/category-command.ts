import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/shared/models/Category";
import { BASE_URL_MAIN } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class CategoryCommand {

  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get<any>(this.apiUrl + "category");
  }

  createCategory(data: any): any {
    return this.http.post<Category>(this.apiUrl + "category/create", data);
  }

  getDetail(id: string): any {
    return this.http.get<Category>(this.apiUrl + "category/" + id);
  }

  deleteCategoryId(id: any) {
    const options: any = {
      body: { id: id }
    };
    return this.http.delete<Category>(this.apiUrl + "category/delete", options);
  }

  updateCategory(data: any) {
    return this.http.patch<Category>(this.apiUrl + "category/update", data);
  }
}
