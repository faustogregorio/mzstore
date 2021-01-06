import { CryptoService } from './../../services/crypto.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BuscarArticulo } from '../buscar.model';
import { BuscarService } from '../buscar.service';

@Component({
  selector: 'app-filtrar-articulos',
  templateUrl: './filtrar-articulos.component.html',
  styleUrls: ['./filtrar-articulos.component.scss']
})
export class FiltrarArticulosComponent implements OnInit, OnDestroy {
  /* @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator; */
  // marcas: Marca[] = [];
  encoded = '';
  corruptEncoded = false;
  decoded: { id: number, val: string } = { id: 0, val: '' };
  urlImagenes = environment.urlImagenes;
  articulosChanged$!: Subscription;
  articulos: BuscarArticulo[] = [];
  filtrar = 0;



  /* infinite scroll */
  sum = 10;
  throttle = 10;
  scrollDistance = 1;
  totalArticulos: BuscarArticulo[] = [];
  parcialArticulos: BuscarArticulo[] = [];

  constructor(
    private buscarService: BuscarService,
    private route: ActivatedRoute,
    private crytojs: CryptoService
  ) {
    this.initArticulosChanged();

    this.appendItems(0, this.sum);
  }

  addItems(startIndex: number, endIndex: number): void {
    this.parcialArticulos = this.parcialArticulos.concat(this.totalArticulos.slice(startIndex, endIndex));
  }

  appendItems(startIndex: number, endIndex: number): void {
    this.addItems(startIndex, endIndex);
  }

  onScrollDown(): void {
    console.log('scrolled down!!');
    if (this.sum >= this.totalArticulos.length) {
      return;
    }
    const start = this.sum;
    this.sum += 10;
    this.appendItems(start, this.sum);
  }
  generateWord(): string {
    return 'hola';
  }


  ngOnInit(): void {
    this.encoded = this.route.snapshot.params.buscar;
    this.corruptEncoded = this.checkDecodedStringWasNotCorrupted(this.encoded);
  }

  initArticulosChanged(): void {
    this.articulosChanged$ = this.buscarService.articulosChanged.subscribe(
      (articulos: BuscarArticulo[]) => {
        console.log('BUscar: ', articulos);
        this.corruptEncoded = articulos.length === 0 ? true : false;
        /* this.totalArticulos = articulos; */
        if (this.filtrar !== 0) {
          this.totalArticulos = this.filtrar === 1 ? articulos.sort(this.filtrarArticulos('precio')) : articulos.sort(this.filtrarArticulos('precio', 'desc'));
        } else {
          this.totalArticulos = articulos;
        }
        this.parcialArticulos = this.totalArticulos.slice(0, 10);
        this.sum = 10;
      }
    );
  }
  onFiltrarPor(filtrar: number): void {
    /*
    0; Lo más nuevo
    1: Precio de más bajo a más alto
    2; Precio de más alto a más bajo
     */
    console.log('Buscar: ', filtrar);
    switch (filtrar) {
      case 0:
        this.totalArticulos.sort(this.filtrarArticulos('id_articulo', 'desc'));
        break;
      case 1:
        this.totalArticulos.sort(this.filtrarArticulos('precio'));
        break;
      case 2:
        this.totalArticulos.sort(this.filtrarArticulos('precio', 'desc'));
        break;
      default:
        break;
    }
    this.filtrar = filtrar;
    this.parcialArticulos = this.totalArticulos.slice(0, 10);
    this.sum = 10;
  }
  onClickArticulo(articulo: BuscarArticulo): void {
    console.log(articulo);
  }

  filtrarArticulos(key: string, order = 'asc'): any {
    return (a: any, b: any) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
      const resultado = a[key] - b[key];
      return (
        (order === 'desc') ? (resultado * -1) : resultado
      );
    };
  }

  checkDecodedStringWasNotCorrupted(encoded: string): boolean {
    try {
      this.decoded = JSON.parse(this.crytojs.decode(encoded));
      return false;
    } catch (error) {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.articulosChanged$.unsubscribe();
  }
}
