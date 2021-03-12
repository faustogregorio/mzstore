import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { GenericServerResponse } from '../admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  domain = environment.api;

  constructor(
    private http: HttpClient
  ) { }

  modificarPassword(password: string, newPassword: string): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(
      `${this.domain}usuario/usuarioPasswordModificar.php`,
      { password, new_password: newPassword },
      this.getHttpOptions());
  }

  getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('Authorization') || ''
      })
    };
  }
}
