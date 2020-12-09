
export interface GenericServerResponse {
  success: boolean;
  message: string;
  id?: number;
}
export interface ResponseArticulo {
  success: boolean;
  articulo: Articulo;
}

export interface Articulo {
  id_articulo: number;
  articulo: string;
  descripcion: string;
  precio: string;
  stock: number;
  marca: string;
}

export interface ResponseSaveArticulo {
  success: boolean;
  message: string;
}



/* export interface SaveArticulo {
  articulo: string;
  descripcion: string;
  precio: string;
  stock: number;
  id_categoria: number;
  id_subcategoria: number;
  id_marca: number;
}
 */
