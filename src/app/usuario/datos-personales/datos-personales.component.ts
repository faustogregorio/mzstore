import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  userForm: FormGroup;
  modificado = {
    nombre_completo: false,
    telefono: false,
    email: false
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      id_usuario: [{value: this.authService.getTokenData.data.id_usuario, disabled: false}, [Validators.required]],
      nombre_completo: [{value: this.authService.getTokenData.data.nombre_completo, disabled: false},
        [Validators.required, Validators.pattern('^[A-ZÑñÁÉÍÓÚáéíóúa-z ]+$'), Validators.maxLength(100)]],
      telefono: [this.authService.getTokenData.data.telefono,
        [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
      email: [this.authService.getTokenData.data.email, [Validators.email, Validators.maxLength(100)] ],
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


}
