
export interface ResponseMarca {
  success: boolean;
  marcas: Marca[];
}
export interface Marca {
  id_marca: number;
  marca: string;
}

export interface ResponseCategoria {
  success: boolean;
  categorias: Categoria[];
}
export interface Categoria {
  id_categoria: number;
  categoria: string;
}

export interface ResponseSubcategoria {
  success: boolean;
  subcategorias: Subcategoria[];
}
export interface Subcategoria {
  id_subcategoria: number;
  subcategoria: string;
}

export interface ResponseArticulo {
  success: boolean;
  articulos: Articulo[];
}
export interface Articulo {
  id_articulo: number;
  articulo: string;
  precio: string;
  id_subcategoria: number;
  subcategoria: string;
  id_marca: number;
  marca: string;
  imagen: string;
}
