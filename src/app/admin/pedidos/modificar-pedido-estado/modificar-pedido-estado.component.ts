import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modificar-pedido-estado',
  templateUrl: './modificar-pedido-estado.component.html',
  styleUrls: ['./modificar-pedido-estado.component.scss']
})
export class ModificarPedidoEstadoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModificarPedidoEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idPedido: number, idEstado: number },
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  updatePedidoEstado(): void {
    this.adminService.updatePedidoEstado(this.data.idPedido, this.data.idEstado).subscribe(
      response => {
        this.dialogRef.close(response);
      }, error => {
        const ERROR = error.error ? error.error.message : '!Error desconocido!';
        this.dialogRef.close({ success: false, message: ERROR });
      }
    );
  }

  closeDailog(): void {
    this.dialogRef.close();
  }

}
