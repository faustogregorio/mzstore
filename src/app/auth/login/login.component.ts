import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LoginRespuesta } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  onSubmit(): void {
    const pattern = /^[A-Za-z0-9]+$/;
    if (pattern.exec(this.password) && this.password.length >= 6 && this.password.length <= 20) {
      console.log('valido');
      this.loginError = false;
      this.authService.login(this.email, this.password).subscribe(
        (result: LoginRespuesta) => {
          console.log(result);
          this.openSnackBar(result.nombre_completo.toUpperCase(), 'BIENVENIDO ');
          localStorage.setItem('Authorization', result.token);
          this.authService.updateAuthenticationStatus(result.success, this.authService.getTokenData.data.esAdmin);
          this.router.navigate(['/usuario']);

        }, error => {
          console.log(error);
          this.openSnackBar(error.error  ? error.error.message : error, 'ERROR');
          this.loginForm.patchValue({
            password: ['']
          });
        }
      );
    } else {
      this.loginForm.patchValue({
        password: ''
      });
      this.loginError = true;
    }
  }

  get password(): string {
    return this.loginForm.get('password')?.value;
  }
  get email(): string {
    return this.loginForm.get('email')?.value;
  }
  verificarError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
