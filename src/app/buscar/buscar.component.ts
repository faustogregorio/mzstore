import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Articulo, Marca } from './buscar.model';
import { BuscarService } from './buscar.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit, OnDestroy {
  /* @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; */
  // marcas: Marca[] = [];
  articulosChanged$: Subscription;
  articulos: Articulo[] = [];
  filtrar = 0;
  constructor(
    private buscarService: BuscarService
  ) {
    this.articulosChanged$ = this.buscarService.articulosChanged.subscribe(
      (articulos: Articulo[]) => {
        console.log('BUscar: ', articulos);
        if (this.filtrar !== 0) {
          this.articulos = this.filtrar === 1 ? articulos.sort(this.filtrarArticulos('precio')) : articulos.sort(this.filtrarArticulos('precio', 'desc'));
        } else {
          this.articulos = articulos;
        }
      }
    );
  }

  ngOnInit(): void {
    /* this.paginator._intl.itemsPerPageLabel = 'Resultados por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior'; */

  }
  onFiltrarPor(filtrar: number): void {
    /*
    0; Lo más nuevo
    1: Precio de más bajo a más alto
    2; Precio de más alto a más bajo
     */
    console.log('Buscar: ', filtrar);
    switch (filtrar) {
      case 0:
        this.articulos.sort(this.filtrarArticulos('id_articulo', 'desc'));
        break;
      case 1:
        this.articulos.sort(this.filtrarArticulos('precio'));
        break;
      case 2:
        this.articulos.sort(this.filtrarArticulos('precio', 'desc'));
        break;
      default:
        break;
    }
    this.filtrar = filtrar;
  }

  filtrarArticulos(key: string, order = 'asc'): any {
    return (a: any, b: any) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const resultado = a[key] - b[key];
      return (
        (order === 'desc') ? (resultado * -1) : resultado
      );
    };
  }

  ngOnDestroy(): void {
    this.articulosChanged$.unsubscribe();
  }
}
