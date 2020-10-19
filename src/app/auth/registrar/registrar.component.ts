import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  hide = true;
  registrarForm: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.registrarForm = this.formBuilder.group({
      id_usuario: [0],
      nombre_completo: ['', [Validators.required, Validators.pattern('^[A-ZÑñÁÉÍÓÚáéíóúa-z ]+$'), Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$'), Validators.minLength(6), Validators.maxLength(20)]],
      confirmar_password: ['', [Validators.required]]
    }, {
      validator: this.verificarCoincidenciaPassword('password', 'confirmar_password')
    });
    this.user = this.registrarForm.value;
  }

  ngOnInit(): void {

  }
  onSubmit(): void {
    if (this.registrarForm.valid && this.registrarForm.dirty && this.registrarForm.touched) {
      console.log(this.registrarForm.value);
      this.user = this.registrarForm.value;
      this.authService.registrarUsuario(this.user).subscribe(
        result => {
          console.log(result);
        }, error => {
          console.log(error);
          console.log(error.error.message);
          console.log(error.status);
        }
      );
    }

  }

  verificarError(controlName: string, errorName: string): boolean {
    return this.registrarForm.controls[controlName].hasError(errorName);
  }
  openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  verificarCoincidenciaPassword(controlName: string, matchingControlName: string): Validators {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

