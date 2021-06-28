import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.authService.authenticationValue) {
      return true;
    }
    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated.subscribe(
        response => {
          if (response.authenticated) {
            resolve(true);
          }
          resolve(this.router.createUrlTree(['/auth/login']));

        }, error => {
          resolve(this.router.createUrlTree(['/auth/login']));

        });
    });
  }
}
