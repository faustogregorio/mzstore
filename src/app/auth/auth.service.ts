import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRespuesta, RegistrarRespuesta, User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  registrarUsuario(user: User): Observable<RegistrarRespuesta> {
    return this.http.post<RegistrarRespuesta>(`${environment.api}user/create.php`, user);
  }

  login(email: string, password: string): Observable<LoginRespuesta> {
    return this.http.post<LoginRespuesta>(`${environment.api}user/login.php`, { email, password });
  }
}
