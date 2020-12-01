import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ResponseCategoria, ResponseMarca, ResponseSubcategoria } from '../buscar/buscar.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {



  constructor(
    private http: HttpClient
  ) { }

  getCategorias(): Observable<ResponseCategoria> {
    return this.http.get<ResponseCategoria>(`${environment.api}categoria/categorias.php`);
  }

  getSubcategorias(): Observable<ResponseSubcategoria> {
    return this.http.get<ResponseSubcategoria>(`${environment.api}subcategoria/subcategorias.php`);
  }

  getMarcas(): Observable<ResponseMarca> {
    return this.http.get<ResponseMarca>(`${environment.api}marca/marcas.php`);
  }
}
