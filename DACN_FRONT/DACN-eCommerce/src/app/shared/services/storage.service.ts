import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private tokenService: TokenService, ) { }

  storeUser(data: any): void {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }
  getUser(): any {
    return localStorage.getItem('currentUser');
  }
  storeAccessToken(token: string): void {
    localStorage.setItem('tokenUser', token);
    this.storeUser(this.tokenService.getDecodedToken(token).data);
  }
  getAccessToken(): any {
    return localStorage.getItem('tokenUser');
  }

  deleteLoggedInUser(): void {
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('currentUser');
  }

  storeToken(token: string): void {
    localStorage.setItem('tokenUser', token);
  }

  deleteTokenTmp(): void {
    localStorage.removeItem('tokenUser');
  }
}
