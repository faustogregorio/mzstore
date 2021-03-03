import { UsuarioPedidoArticulo } from './../../admin.model';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { UsuarioPedido } from '../../admin.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-usuario-pedidos',
  templateUrl: './usuario-pedidos.component.html',
  styleUrls: ['./usuario-pedidos.component.scss']
})
export class UsuarioPedidosComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  pedidos: UsuarioPedido[] = [];
  articulos: UsuarioPedidoArticulo[] = [];
  idPedido = 0;
  constructor(
    public dialogRef: MatDialogRef<UsuarioPedidosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id_usuario: number, nombre: string},
    private adminService: AdminService
  ) {
    console.log(this.data.id_usuario);
    this.adminService.getUsuarioPedidos(this.data.id_usuario).subscribe(
      response => {
        console.log(response);
        this.pedidos = response.pedidos;
      }, error => {
        console.log(error);
      }
    );
  }


  ngOnInit(): void {
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  setTextColor(colorRGB: string): string {
    const RGB = colorRGB.split(',');
    const SUMA = Math.round(((Number(RGB[0]) * 299) + (Number(RGB[1]) * 587) + (Number(RGB[2]) * 114)) / 1000);
    return (SUMA > 128) ? 'black' : 'white';
  }

}
