import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticuloComponent } from 'src/app/articulo/articulo.component';

@Component({
  selector: 'app-mostrar-articulos',
  templateUrl: './mostrar-articulos.component.html',
  styleUrls: ['./mostrar-articulos.component.scss']
})
export class MostrarArticulosComponent implements OnInit {
  @Input() articulos: any;
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

}
