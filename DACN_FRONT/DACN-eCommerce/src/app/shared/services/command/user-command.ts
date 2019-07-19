import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BASE_URL } from "src/environments/environment";
import { User } from "../../models/user";

@Injectable({ providedIn: 'root' })
export class UserCommand {

  tokenService: any;
  storageService: any;

  private readonly apiUrl = BASE_URL;
  constructor(private http: HttpClient) { }

  loginWithGmail(data: any): any {
    return this.http.post<User>(this.apiUrl + "login", data);
  }

  loginWithGoogle(data: any): any {
    return this.http.post<User>(this.apiUrl + "login-with-google", data);
  }

  createUser(data: any): any {
    return this.http.post<User>(this.apiUrl + "signup", data);
  }

  getProfile(): any {
    return this.http.get<any>(this.apiUrl + "user/profile");
  }

  getUser(): any {
    return this.http.get<any>(this.apiUrl + "users");
  }

  deleteUserId(id: any): any {
    return this.http.get<User>(this.apiUrl + "user/remove/" + id);
  }

  updateUser(data: any): any {
    return this.http.patch<User>(this.apiUrl + "user/update", data);
  }

  uploadAvatar(data: any): any {
    return this.http.post<any>(this.apiUrl + "user/upload-avatar", data);
  }

  forgotPassword(emailAddress: any): any {
    return this.http.post<any>(this.apiUrl + "forgot-password", emailAddress);
  }

  resetPassword(data: any): any {
    return this.http.post<any>(this.apiUrl + "reset-password", data);
  }

  changPassword(data: any): any {
    return this.http.post<any>(this.apiUrl + "change-password", data);
  }

  confirmEmail(token) {
    return this.http.get<any>(this.apiUrl + "confirm-email?token=" + token);
  }

  requestConfirmEmail(token) {
    const headers = new HttpHeaders({
      "Authorization": "Bearer " + token
    });
    const options = { headers: headers };
    return this.http.get(this.apiUrl + "request-email-confirm", options);
  }
}
