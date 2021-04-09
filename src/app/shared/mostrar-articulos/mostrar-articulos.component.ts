import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloComponent } from 'src/app/articulo/articulo.component';
import { BuscarArticulo } from 'src/app/buscar/buscar.model';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-mostrar-articulos',
  templateUrl: './mostrar-articulos.component.html',
  styleUrls: ['./mostrar-articulos.component.scss']
})
export class MostrarArticulosComponent implements OnInit {
  rutaImg = environment.urlImagenes;
  @Input() articulos!: BuscarArticulo[];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onClickArticulo(articulo: any): void {
    console.log(articulo);
    const dialogRef = this.dialog.open(ArticuloComponent, {
      data: articulo.id_articulo,
      panelClass: 'dialog',
      autoFocus: false,
    });
  }
  getDescuento(precio: number, descuento: number): number {
    return Math.trunc(descuento ? (precio * descuento / 100) : 0);
  }

}
