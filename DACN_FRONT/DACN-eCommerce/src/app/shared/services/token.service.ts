import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class TokenService {
    private _jwtHelperService = new JwtHelperService();

    constructor() { }

    public getDecodedToken(token: string): any {
        return this._jwtHelperService.decodeToken(token);
    }
}
