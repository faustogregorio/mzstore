import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { ResponseMarca, ResponseCategoria, ResponseSubcategoria, ResponseArticulo, Articulo } from './buscar.model';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  articulosChanged = new BehaviorSubject<Articulo[]>([]);
  constructor(
    private http: HttpClient
  ) { }

  getMarcas(): Observable<ResponseMarca> {
    return this.http.get<ResponseMarca>(`${environment.api}marca/marcas.php`);
  }

  getCategorias(): Observable<ResponseCategoria> {
    return this.http.get<ResponseCategoria>(`${environment.api}categoria/categorias.php`);
  }

  getSubcategorias(): Observable<ResponseSubcategoria> {
    return this.http.get<ResponseSubcategoria>(`${environment.api}/subcategoria/subcategorias.php`);
  }

  getArticulosPorCategoria(idCategoria: number): Observable<ResponseArticulo> {
    return this.http.post<ResponseArticulo>(`${environment.api}/articulo/articulosPorCategoria.php`,
      { id_categoria: idCategoria });
  }

  updateArticulos(artculos: Articulo[]): void {
    this.articulosChanged.next(artculos);
  }
}
