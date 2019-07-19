import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private token: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!isNullOrUndefined(this.token.isLoggedIn())) {
      console.log("getLoggedInUser", this.token.getLoggedInUser())

      // logged in so return true
      // if (this.token.getLoggedInUser() != null) {
      //   console.log("getLoggedInUser isConfirm", this.token.getLoggedInUser().isConfirmed);
      //   if (this.token.getLoggedInUser().isConfirmed)
      //     return true;
      //   else
      //     this.router.navigate(['/confirm']);
      // }
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
