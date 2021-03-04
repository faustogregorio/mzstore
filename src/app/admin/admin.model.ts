
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
  id_articulo: number;
  sku: string;
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

export interface ResponseUsuarios {
  success: boolean;
  usuarios: Usuario[];
}

export interface Usuario {
  id_usuario: number;
  nombre_completo: string;
  telefono: string;
  email: string;
  fecha_creacion: Date;
  pedidos_realizados: number;
}
export interface ResponsePedidos {
  success: boolean;
  pedidos: Pedido[];

}
export interface Pedido {
  id_usuario: number;
  nombre_completo: string;
  telefono: string;
  email: string;
  id_pedido: number;
  fecha_pedido: Date;
  id_pedido_estado?: number;
  pedido_estado: string;
  estado_color: string;

}
export interface ResponseUsuarioPedidos {
  success: boolean;
  pedidos: UsuarioPedido[];

}
export interface UsuarioPedido {
  id_usuario: number;
  nombre_completo: string;
  telefono: string;
  email: string;
  id_pedido: number;
  fecha_pedido: Date;
  pedido_estado: string;
  estado_color: string;

}
export interface ResponseUsuarioPedidoArticulos {
  success: boolean;
  articulos: UsuarioPedidoArticulo[];
}
export interface UsuarioPedidoArticulo {
  id_articulo: number;
  articulo: string;
  cantidad: number;
  precio_unitario: number;
  descuento: number;
  imagen: string;
}

export interface ResponsePedidoEstados{
  success: boolean;
  estados: PedidoEstado[];
}
export interface PedidoEstado {
  id_pedido_estado: number;
  pedido_estado: string;
  estado_color: string;
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
