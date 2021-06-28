import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


      if (this.authService.authenticationValue) {
        return this.router.createUrlTree(['']);
      }
      return new Promise((resolve, reject) => {
        this.authService.isAuthenticated.subscribe(
          response => {
            if (response.authenticated) {
              resolve(this.router.createUrlTree(['']));
            }
            resolve(true);

          }, error => {
            console.log(error);
            resolve(true);

          });
      });
  }

}
