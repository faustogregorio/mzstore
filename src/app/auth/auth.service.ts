import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Authenticated, LoginRespuesta, RegistrarRespuesta, User, TokenData, CheckAuth } from './user.model';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('Authorization') || ''
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  authenticationStatusChanged = new BehaviorSubject<CheckAuth>({authenticated: false, esAdmin: false});
  authenticationStatus = false;
  esAdminStatus = false;
  constructor(
    private http: HttpClient
  ) { }

  registrarUsuario(user: User): Observable<RegistrarRespuesta> {
    return this.http.post<RegistrarRespuesta>(`${environment.api}user/create.php`, user).pipe(
      catchError(this.handleError)
    );
  }

  login(email: string, password: string): Observable<LoginRespuesta> {
    return this.http.post<LoginRespuesta>(`${environment.api}user/login.php`, { email, password }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  get isAuthenticated(): Observable<Authenticated> {
    return this.http.get<Authenticated>(`${environment.api}authenticated.php`, httpOptions);
  }

  get authenticationValue(): boolean {
    return this.authenticationStatus;
  }

  get esAdminValue(): boolean {
    return this.esAdminStatus;
  }

  get getTokenData(): TokenData {
    return this.helper.decodeToken(localStorage.getItem('Authorization') || '');
  }

  updateAuthenticationStatus(authenticatedStatus: boolean, adminStatus: boolean): void {
    this.authenticationStatus = authenticatedStatus;
    this.esAdminStatus = adminStatus;
    this.authenticationStatusChanged.next({authenticated: authenticatedStatus, esAdmin: adminStatus});
  }



  private handleError(error: HttpErrorResponse): Observable<never> {
    /* if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    } */
    // Return an observable with a user-facing error message.
    switch (error.status) {
      case 405:
        return throwError(
          error.error.message);
        break;
      case 401:
        return throwError(
          error.error.message);
        break;
      case 400:
        return throwError(
          error.error.message);
        break;
      default:
        return throwError(
          'Algo malo sucedió; por favor intente de nuevo.');
        break;
    }
  }
}
