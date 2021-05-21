import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { UsuarioService } from '../usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  hide = true;
  userForm: FormGroup;
  modificado = {
    nombre_completo: false,
    telefono: false,
    email: false
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      id_usuario: [{ value: this.authService.getTokenData.data.id_usuario, disabled: false }, [Validators.required]],
      nombre_completo: [{ value: this.authService.getTokenData.data.nombre_completo, disabled: false },
      [Validators.required, Validators.pattern('^[A-ZÑñÁÉÍÓÚáéíóúa-z ]+$'), Validators.maxLength(100)]],
      telefono: [this.authService.getTokenData.data.telefono,
      [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: [this.authService.getTokenData.data.email, [Validators.email, Validators.maxLength(100)]],
      actual_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$'), Validators.maxLength(20)]],
      new_password: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$'), Validators.minLength(6), Validators.maxLength(20)]],
      confirm_new_password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.userForm.get('nombre_completo')?.valueChanges.subscribe({
      next: (nombre) => {
        this.modificado.nombre_completo = true;
      }
    });
    this.userForm.get('telefono')?.valueChanges.subscribe({
      next: (telefono) => {
        this.modificado.telefono = true;
      }
    });
    this.userForm.get('email')?.valueChanges.subscribe({
      next: (email) => {
        this.modificado.email = true;
      }
    });
  }
  modificarPassword(): void {
    if (this.newPassword.value === this.confirmNewPassword.value) {
      console.log(this.userForm);
      if (
        this.actualPassword.valid &&
        this.newPassword.valid &&
        this.confirmNewPassword.valid
      ) {
        this.usuarioService.modificarPassword(this.actualPassword.value, this.newPassword.value).subscribe(
          {
            next: (response) => {
              this.openSnackBar(response.message);
              this.userForm.patchValue({
                actual_password: '',
                new_password: '',
                confirm_new_password: ''
              });
            },
            error: (error) => {
              this.openSnackBar(error.error ? error.error.message : 'Error desconocido', 'ERROR', 4000);
            }
          }
        );

      } else {
        this.openSnackBar('Verifique que los campos sean válidos', 'ERROR', 4000);
      }
    } else {
      this.openSnackBar('Contraseñas no coinciden', 'ERROR', 4000);
    }

  }

  get userId(): FormControl {
    return this.userForm.get('id_usuario') as FormControl;
  }
  get actualPassword(): FormControl {
    return this.userForm.get('actual_password') as FormControl;
  }
  get newPassword(): FormControl {
    return this.userForm.get('new_password') as FormControl;
  }
  get confirmNewPassword(): FormControl {
    return this.userForm.get('confirm_new_password') as FormControl;
  }

  openSnackBar(message: string, action = 'ACEPTAR', duration = 3000): void {
    this.snackBar.open(message, action, { duration });
  }

}
