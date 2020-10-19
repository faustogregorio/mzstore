import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtrar',
  templateUrl: './filtrar.component.html',
  styleUrls: ['./filtrar.component.scss']
})
export class FiltrarComponent implements OnInit {

  filtro: string;
  filtros: string[];

  constructor() {
    this.filtro = 'Lo más nuevo';
    this.filtros = [
      'Lo más nuevo',
      'Precio de más bajo a más alto',
      'Precio de más alto a más bajo'
    ]
  }

  ngOnInit(): void {
  }

  filtrar(option: number): void {
    console.log(option);
    this.filtro = this.filtros[option];
  }

}
