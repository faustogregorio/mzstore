import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { ResponseMarca, ResponseCategoria, ResponseSubcategoria, ResponseBuscarArticulo, BuscarArticulo } from './buscar.model';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {
  articulosChanged = new BehaviorSubject<BuscarArticulo[]>([]);
  DOMAIN = environment.api;
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

  getArticulosPorCategoria(idCategoria: number): Observable<ResponseBuscarArticulo> {
    return this.http.post<ResponseBuscarArticulo>(`${environment.api}/articulo/articulosPorCategoria.php`,
      { id_categoria: idCategoria });
  }

  updateArticulos(artculos: BuscarArticulo[]): void {
    this.articulosChanged.next(artculos);
  }

  getArticulosDestacados(): Observable<ResponseBuscarArticulo> {
    return this.http.get<ResponseBuscarArticulo>(`${this.DOMAIN}articulo/articulosDestacados.php`);
  }
  getLoMasNuevo(): Observable<ResponseBuscarArticulo> {
    return this.http.get<ResponseBuscarArticulo>(`${this.DOMAIN}articulo/articulosMasNuevos.php`);
  }
  getOfertas(): Observable<ResponseBuscarArticulo> {
    return this.http.get<ResponseBuscarArticulo>(`${this.DOMAIN}articulo/articulosOfertas.php`);
  }
}
