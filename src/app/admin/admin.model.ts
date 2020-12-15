
export interface GenericServerResponse {
  success: boolean;
  message: string;
  id?: number;
}
export interface ResponseArticulo {
  success: boolean;
  articulo: Articulo;
}
export interface ResponseArticulos {
  success: boolean;
  articulos: Articulo[];
}

export interface Articulo {
  index?: number;
  id_articulo: number;
  articulo: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria: string;
  subcategoria: string;
  marca: string;
  fecha_creacion: Date;
  imagen: string;
  descuento: number;
  imagenes?: Imagen[];
}

export interface Imagen {
  id_imagen: number;
  imagen: string;
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
