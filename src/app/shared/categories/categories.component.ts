import { Categoria, ResponseBuscarArticulo, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria, BuscarArticulo } from './../../buscar/buscar.model';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Marca } from 'src/app/buscar/buscar.model';
import { BuscarService } from 'src/app/buscar/buscar.service';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, from, Observable, of, Subscription } from 'rxjs';

export interface Task {
  name: string;
  completed: boolean;
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @Input() idCategoria = 0;
  marcas: Marca[] = [];
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  articulos: BuscarArticulo[] = [];
  articulosFiltradosPorSubcategorias: BuscarArticulo[] = [];
  articulosFiltradosPorMarca: BuscarArticulo[] = [];
  checked = false;
  constructor(
    private buscarService: BuscarService
  ) {
    this.getCategorias();
  }

  ngOnInit(): void {
    console.log('id_categoira: ', this.idCategoria);
   /*  this.checkCategoriaIdExist(); */
  }
  /* checkCategoriaIdExist(): void {
    if (this.idCategoria !== 0) {
      this.getArticulosPorCategoria(this.idCategoria);
    }
  } */
  getMarcasFromArticulos(articulos: BuscarArticulo[]): void {
    const idMarcas: number[] = [];
    this.marcas = articulos.filter(
      articulo => {
        if (!idMarcas.includes(articulo.id_marca)) {
          idMarcas.push(articulo.id_marca);
          return { id_marca: articulo.id_marca, marca: articulo.marca };
        }
        return;
      }
    );
  }

  getCategorias(): void {
    this.buscarService.getCategorias().subscribe(
      (response: ResponseCategoria) => {
        console.log(response);
        this.categorias = response.categorias;
      }, error => {
        console.log(error);
      }
    );
  }

  getArticulosPorCategoria(idCategoria: number): void {
    this.buscarService.getArticulosPorCategoria(idCategoria).subscribe(
      (response: ResponseBuscarArticulo) => {
        console.log('ArticuloPORCATEGORIA: ', response);
        this.articulos = response.articulos;
        this.buscarService.updateArticulos(response.articulos);
        this.getSubcategoriasFromArticulos();
        this.getMarcasFromArticulos(response.articulos);
      }
    );
  }

  getSubcategoriasFromArticulos(): void {
    const tempArray: number[] = [];
    this.subcategorias = this.articulos.filter(
      articulo => {
        if (!tempArray.includes(articulo.id_subcategoria)) {
          tempArray.push(articulo.id_subcategoria);
          return { id_subcategoria: articulo.id_subcategoria, subcategoria: articulo.subcategoria };
        }
        return;
      }
    );
  }

  onCheckboxSubcategoriasChanged(idSubcategoria: number, checked: boolean): void {
    console.log('idSubcategoria: ', idSubcategoria, ' checked: ', checked);
    if (checked) {
      this.articulosFiltradosPorSubcategorias = [...this.articulosFiltradosPorSubcategorias, ...this.articulos.filter(
        (articulo: BuscarArticulo) => {
          if (articulo.id_subcategoria === idSubcategoria) {
            return articulo;
          }
          return;
        }
      )];
    } else {
      this.articulosFiltradosPorSubcategorias = this.articulosFiltradosPorSubcategorias.filter(
        (articulo: BuscarArticulo) => {
          if (articulo.id_subcategoria !== idSubcategoria) {
            return articulo;
          }
          return;
        });
    }
    if (this.articulosFiltradosPorSubcategorias.length > 0) {
      this.buscarService.updateArticulos(this.articulosFiltradosPorSubcategorias);
      this.getMarcasFromArticulos(this.articulosFiltradosPorSubcategorias);
    } else {
      this.buscarService.updateArticulos(this.articulos);
      this.getMarcasFromArticulos(this.articulos);
      this.articulosFiltradosPorSubcategorias = [];
    }
    this.articulosFiltradosPorMarca = [];
    this.uncheckeingCheckbox();
  }

  onCheckboxMarcasChanged(idMarca: number, checked: boolean): void {
    console.log('idSubcategoria: ', idMarca, ' checked: ', checked);
    const articulos = this.articulosFiltradosPorSubcategorias.length > 0 ? this.articulosFiltradosPorSubcategorias : this.articulos;
    if (checked) {
      this.articulosFiltradosPorMarca = [...this.articulosFiltradosPorMarca, ...articulos.filter(
        (articulo: BuscarArticulo) => {
          if (articulo.id_marca === idMarca) {
            return articulo;
          }
          return;
        }
      )];
    } else {
      this.articulosFiltradosPorMarca = this.articulosFiltradosPorMarca.filter(
        (articulo: BuscarArticulo) => {
          if (articulo.id_marca !== idMarca) {
            return articulo;
          }
          return;
        });
    }
    if (this.articulosFiltradosPorMarca.length > 0) {
      this.buscarService.updateArticulos(this.articulosFiltradosPorMarca);
    } else {
      this.buscarService.updateArticulos(this.articulos);
      this.articulosFiltradosPorMarca = [];
    }
  }

  uncheckeingCheckbox(): void {
    this.checked = true;
    setTimeout(() => {
      this.checked = false;
    }, 0);

  }

  reset(): void {
    this.subcategorias = [];
    this.articulosFiltradosPorSubcategorias = [];
    this.articulosFiltradosPorMarca = [];
  }
}
