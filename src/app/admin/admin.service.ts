import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from '../buscar/buscar.model';
import {
  GenericServerResponse,
  Imagen, ResponseArticulo,
  ResponseArticulos, ResponseSaveArticulo,
  ResponseUsuarios, ResponseUsuarioPedidos,
  ResponseUsuarioPedidoArticulos, ResponsePedidos,
  ResponsePedidoEstados, PedidoEstado
} from './admin.model';

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
  updateArticulo(idArticulo: number, update: string, data: string | number | object | Imagen[]): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(
      `${this.domain}articulo/articuloModificar.php?id_articulo=${idArticulo}&update=${update}`, { data },
      this.getHttpOptions());
  }
  deleteArticulo(idArticulo: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(
      `${this.domain}articulo/articuloEliminar.php?id_articulo=${idArticulo}`,
      this.getHttpOptions());
  }

  getUsuarios(): Observable<ResponseUsuarios> {
    return this.http.get<ResponseUsuarios>(`${this.domain}usuario/usuarios.php`, this.getHttpOptions());
  }
  deleteUsuario(idUsuario: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(
      `${this.domain}usuario/usuarioEliminar.php?id_usuario=${idUsuario}`,
      this.getHttpOptions());
  }
  getUsuarioPedidos(idUsuario: number): Observable<ResponseUsuarioPedidos> {
    return this.http.get<ResponseUsuarioPedidos>(
      `${this.domain}/pedido/usuarioPedidos.php?id_usuario=${idUsuario}`,
      this.getHttpOptions());
  }
  updateUsuarioPassword(password: string, idUsuario: number): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(
      `${this.domain}usuario/adminModificarPassword.php`,
      { password, id_usuario: idUsuario },
      this.getHttpOptions());
  }
  getArticulosUsuarioPedido(idPedido: number): Observable<ResponseUsuarioPedidoArticulos> {
    return this.http.get<ResponseUsuarioPedidoArticulos>(
      `${this.domain}/pedido/articulosUsuarioPedido.php?id_pedido=${idPedido}`,
      this.getHttpOptions());
  }


  getPedidos(): Observable<ResponsePedidos> {
    return this.http.get<ResponsePedidos>(`${this.domain}pedido/pedidos.php`, this.getHttpOptions());
  }
  getPedidoEstados(): Observable<ResponsePedidoEstados> {
    return this.http.get<ResponsePedidoEstados>(`${this.domain}pedido/pedidoEstados.php`, this.getHttpOptions());
  }
  updatePedidoEstado(idPedido: number, idEstado: number): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(
      `${this.domain}pedido/pedidoEstadoModificar.php`,
      { id_pedido_estado: idEstado, id_pedido: idPedido },
      this.getHttpOptions());
  }

  getEstados(): Observable<ResponsePedidoEstados> {
    return this.http.get<ResponsePedidoEstados>(`${this.domain}estado/estados.php`, this.getHttpOptions());
  }
  createEstado(pedidoEstado: string, estadoColor: string): Observable<GenericServerResponse> {
    return this.http.post<GenericServerResponse>(`${this.domain}estado/estadoCrear.php`, {pedido_estado: pedidoEstado, estado_color: estadoColor}, this.getHttpOptions());
  }
  updateEstado(estado: PedidoEstado): Observable<GenericServerResponse> {
    return this.http.patch<GenericServerResponse>(`${this.domain}estado/estadoModificar.php`, estado, this.getHttpOptions());
  }
  deleteEstado(idEstado: number): Observable<GenericServerResponse> {
    return this.http.delete<GenericServerResponse>(`${this.domain}estado/estadoEliminar.php?id_pedido_estado=${idEstado}`, this.getHttpOptions());
  }

  getHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('Authorization') || ''
      })
    };
  }
}
