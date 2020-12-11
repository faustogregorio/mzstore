import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from '../buscar/buscar.model';
import { GenericServerResponse, ResponseArticulos, /* ResponseArticulo, */ ResponseSaveArticulo } from './admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  domain = environment.api;


  constructor(
    private http: HttpClient
  ) { }

  getCategorias(): Observable<ResponseCategoria> {
    return this.http.get<ResponseCategoria>(`${this.domain}categoria/categorias.php`);
  }
  createCategoria(categoria: { categoria: string }): Observable<GenericServerResponse> {
    return this.http.post<GenericServerResponse>(`${this.domain}categoria/categoriaCrear.php`, categoria, this.getHttpOptions());
  }
  updateCategoria(categoria: Categoria): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(`${this.domain}categoria/categoriaModificar.php`, categoria, this.getHttpOptions());
  }
  deleteCategoria(idCategoria: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(`${this.domain}categoria/categoriaEliminar.php?id_categoria=${idCategoria}`,
      this.getHttpOptions());
  }

  getSubcategorias(): Observable<ResponseSubcategoria> {
    return this.http.get<ResponseSubcategoria>(`${this.domain}subcategoria/subcategorias.php`);
  }
  createSubcategoria(subcategoria: { subcategoria: string }): Observable<GenericServerResponse> {
    return this.http.post<GenericServerResponse>(`${this.domain}subcategoria/subcategoriaCrear.php`, subcategoria, this.getHttpOptions());
  }
  updateSubcategoria(subcategoria: Subcategoria): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(`${this.domain}subcategoria/subcategoriaModificar.php`,
      subcategoria, this.getHttpOptions());
  }
  deleteSubcategoria(idSubcategoria: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(`${this.domain}subcategoria/subcategoriaEliminar.php?id_subcategoria=${idSubcategoria}`,
      this.getHttpOptions());
  }

  getMarcas(): Observable<ResponseMarca> {
    return this.http.get<ResponseMarca>(`${this.domain}marca/marcas.php`);
  }
  createMarca(marca: { marca: string }): Observable<GenericServerResponse> {
    return this.http.post<GenericServerResponse>(`${this.domain}marca/marcaCrear.php`, marca, this.getHttpOptions());
  }
  updateMarca(marca: Marca): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(`${this.domain}marca/marcaModificar.php`, marca, this.getHttpOptions());
  }
  deleteMarca(idMarca: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(`${this.domain}marca/marcaEliminar.php?id_marca=${idMarca}`, this.getHttpOptions());
  }

  getArticulos(): Observable<ResponseArticulos> {
    return this.http.get<ResponseArticulos>(`${this.domain}articulo/articulos.php`);
  }
  /* getArticulo(idArticulo: number): Observable<ResponseArticulo> {
    return this.http.get<ResponseArticulo>(`${this.domain}articulo/articulo.php?id_articulo=${idArticulo}`);
  } */


  saveArticulo(formData: FormData): Observable<ResponseSaveArticulo> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('Authorization') || ''
      })
    };
    return this.http.post<ResponseSaveArticulo>(`${this.domain}articulo/articuloCrear.php`, formData, httpOptions);
  }

  getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('Authorization') || ''
      })
    };
  }
}
