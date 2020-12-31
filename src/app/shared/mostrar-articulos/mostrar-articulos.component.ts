import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-articulos',
  templateUrl: './mostrar-articulos.component.html',
  styleUrls: ['./mostrar-articulos.component.scss']
})
export class MostrarArticulosComponent implements OnInit {
  @Input() articulos: any;
  constructor() { }

  ngOnInit(): void {
  }

  onClickArticulo(articulo: any): void {
    console.log(articulo)
  }

}
