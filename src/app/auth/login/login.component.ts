import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
  verificarError(controlName: string, errorName: string): boolean {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
}
