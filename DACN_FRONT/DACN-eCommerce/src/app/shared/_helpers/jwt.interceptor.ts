import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public token: AuthService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // let contentType = null;
        // if (request.headers.has('Content-Type') && request.headers.get('Content-Type') === 'multipart/form-data') {
        //     contentType = 'application/x-www-form-urlencoded';
        // } else {
        //     contentType = 'application/json'
        // }

        if (!isNullOrUndefined(this.token.getToken())) {
            request = request.clone({
                headers: new HttpHeaders({
                    'Accept': 'application/json',
                    Authorization: `Bearer ${this.token.getToken()}`,
                })
            });
        }
        return next.handle(request);
    }
}