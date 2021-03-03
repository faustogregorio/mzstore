import { UsuarioPedidoArticulo } from './../../../admin.model';
import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/admin.service';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-usuario-pedido-articulos',
  templateUrl: './usuario-pedido-articulos.component.html',
  styleUrls: ['./usuario-pedido-articulos.component.scss']
})
export class UsuarioPedidoArticulosComponent implements OnInit {
  displayedColumns: string[] = ['articulo', 'precio_unitario', 'cantidad', 'subtotal','descuento', 'total'];
  articulos: UsuarioPedidoArticulo[] = [];

  @Input() idPedido!: number;
  @Input() color!: string;
  @Input() textColor!: string;
  urlImageStored = environment.urlImagenes;
  constructor(
    private adminService: AdminService
  ) {
  }

  ngOnInit(): void {
    this.getPedidoArticulos();
  }
  /** Gets the total cost of all transactions. */
  /* getTotalCost() {
    return this.articulos.map(t => t.precio_unitario).reduce((acc, value) => acc + value, 0);
  } */
   getTotalCost(): number {
     return this.articulos.map(
       articulo => articulo.cantidad *
         (articulo.precio_unitario - this.getDescuento(articulo.precio_unitario, articulo.descuento))
     ).reduce((acc, value) => acc + value, 0);
   }

   getDescuento(precio: number, descuento: number): number {
     return Math.trunc(descuento ? (precio * descuento / 100) : 0);
   }

  getPedidoArticulos(): void {
    this.adminService.getArticulosUsuarioPedido(this.idPedido).subscribe(
      response => {
        this.articulos = response.articulos;
      }, error => {
        console.log(error);
      }
    );
  }

}
