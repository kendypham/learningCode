import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BASE_URL_MAIN } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class AnalystCommand {

  private readonly apiUrl = BASE_URL_MAIN;
  constructor(private http: HttpClient) { }

  get(): any {
    return this.http.get<any>(this.apiUrl + 'analyst');
  }


  // deleteCategoryId(id: any) {
  //   this.http.delete<Category>(this.apiUrl + 'ategory/delete', id);
  // }
}
