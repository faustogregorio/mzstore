export interface Properties {
  id: number;
  cellsElement: HTMLElement;
  hostElement: HTMLElement;
  images: any;
  cellWidth: number;
  loop: boolean;
  autoplayInterval: number;
  overflowCellsLimit: number;
  visibleWidth: number;
  margin: number;
  minSwipeDistance: number;
  transitionDuration: number;
  transitionTimingFunction: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  videoProperties: any;
  eventHandler?: any;
  freeScroll: boolean;
  lightDOM: boolean;
}

export interface Images {
  [index: number]: {
    /* path: string;
    width?: number;
    height?: number; */
    // type?: 'image' | 'video'
    id_articulo: number;
    sku: string;
    articulo: string;
    precio: number;
    descuento: number;
    stock: number;
    id_subcategoria: number;
    subcategoria: string;
    id_marca: number;
    marca: string;
    imagen: string;
  };
}

export interface Image {
  /* path: string;
  width?: number;
  height?: number; */
  id_articulo: number;
  sku: string;
  articulo: string;
  precio: number;
  descuento: number;
  stock: number;
  id_subcategoria: number;
  subcategoria: string;
  id_marca: number;
  marca: string;
  imagen: string;
}
