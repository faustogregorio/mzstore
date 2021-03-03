import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modificar-password',
  templateUrl: './modificar-password.component.html',
  styleUrls: ['./modificar-password.component.scss']
})
export class ModificarPasswordComponent {
  hide = true;
  form: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<ModificarPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {idUsuario: number, nombreCompleto: string},
    private adminService: AdminService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.adminService.updateUsuarioPassword(this.form.value.password, this.data.idUsuario).subscribe(
        response => {
          this.dialogRef.close(response);
        }, error => {
          const ERROR = error.error ? error.error.message : '!Error desconocido!';
          this.dialogRef.close({ success: false, message: ERROR });
        }
      );
    }
  }

  closeDailog(): void {
    this.dialogRef.close();
  }

}
