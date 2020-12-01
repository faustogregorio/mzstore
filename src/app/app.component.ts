import { MatSidenav } from '@angular/material/sidenav';
import { environment } from './../environments/environment.prod';
import { ChangeDetectorRef, Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { CheckAuth, TokenData } from './auth/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  esAdmin = false;
  authenticationStatusSubscription: Subscription;
  datosToken: TokenData;
  colorIcono = 'black';

  @ViewChild('snav') menuSidenav?: MatSidenav;
  @ViewChild('snav2') userSidenav?: MatSidenav;
  @ViewChild('snav2') userSidenavElementRef?: ElementRef;

  panelOpenState = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.datosToken = {
      aud: '',
      data: {
        id_usuario: 0,
        nombre_completo: '',
        email: '',
        esAdmin: false
      },
      exp: 0,
      iat: 0,
      iss: '',
      nbf: 0
    };
    this.authenticationStatusSubscription = this.authService.authenticationStatusChanged.subscribe(
      (status: CheckAuth) => {
        console.log('cambio a : ', status);
        this.isAuthenticated = status.authenticated;
        this.esAdmin = status.esAdmin;
        this.datosToken = this.authService.getTokenData;
      }
    );
  }

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe(
      respuesta => {
        this.authService.updateAuthenticationStatus(respuesta.autheticated, this.datosToken.data.esAdmin);
        console.log(this.datosToken);
      }, error => {
        this.authService.updateAuthenticationStatus(false, false);
        console.log(error);
      }
    );
  }

  logout(): void {
    this.authService.updateAuthenticationStatus(false, false);
    /* this.isAuthenticated = false;
    this.esAdmin = false; */
    this.userSidenav?.close();
    localStorage.removeItem('Authorization');
    this.router.navigate(['']);


  }
  login(): void {
    this.userSidenav?.close();
    this.router.navigate(['/auth/login']);
  }

  redirectTo(ruta: string): void {
    this.userSidenav?.close();
    this.router.navigate([ruta]);
  }

  onMenuClicked(snav: string): void {
    console.log(snav, ' que');
    if (snav === 'cuenta') {
      this.menuSidenav?.close();
      /* if (!this.isAuthenticated) {
        this.login();
      } else { */
      this.userSidenav?.toggle();
      /* } */
    } else if (snav === 'cerrar') {
      this.userSidenav?.close();
      this.menuSidenav?.close();
    } else {
      this.userSidenav?.close();
      this.menuSidenav?.toggle();
    }
  }
  onSelectedOption(): void {
    this.menuSidenav?.close();
    this.userSidenav?.close();
  }

  ngOnDestroy(): void {
    this.authenticationStatusSubscription.unsubscribe();
  }

}
