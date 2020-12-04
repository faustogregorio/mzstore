import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseCategoria, ResponseMarca, ResponseSubcategoria } from '../buscar/buscar.model';
import { ResponseArticulo, ResponseSaveArticulo } from './admin.model';

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

  getSubcategorias(): Observable<ResponseSubcategoria> {
    return this.http.get<ResponseSubcategoria>(`${this.domain}subcategoria/subcategorias.php`);
  }

  getMarcas(): Observable<ResponseMarca> {
    return this.http.get<ResponseMarca>(`${this.domain}marca/marcas.php`);
  }

  getArticulo(idArticulo: number): Observable<ResponseArticulo> {
    return this.http.get<ResponseArticulo>(`${this.domain}articulo/articulo.php?id_articulo=${idArticulo}`);
  }

  saveArticulo(formData: FormData): Observable<ResponseSaveArticulo> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('Authorization') || ''
      })
    };
    return this.http.post<ResponseSaveArticulo>(`${this.domain}articulo/articuloCrear.php`, formData, httpOptions);
  }
}
