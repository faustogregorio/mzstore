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
  decoded: {id: number, val: string} = {id: 0, val: ''};
  urlImagenes = environment.urlImagenes;
  articulosChanged$!: Subscription;
  articulos: BuscarArticulo[] = [];
  filtrar = 0;



  array: any = [];
  sum = 100;
  throttle = 100;
  scrollDistance = 1;
  direction = '';
  modalOpen = false;

  constructor(
    private buscarService: BuscarService,
    private route: ActivatedRoute,
    private crytojs: CryptoService
  ) {
    this.initArticulosChanged();

    this.appendItems(0, this.sum);
  }

  addItems(startIndex: number, endIndex: number, method: string): void {
    for (let i = 0; i < this.sum; ++i) {
      this.array[method]([i, ' ', this.generateWord()].join(''));
    }
  }

  appendItems(startIndex: number, endIndex: number): void {
    this.addItems(startIndex, endIndex, 'push');
  }

  prependItems(startIndex: number, endIndex: number): void {
    this.addItems(startIndex, endIndex, 'unshift');
  }

  onScrollDown(): void {
    console.log('scrolled down!!');

    // add another 20 items
    const start = this.sum;
    this.sum += 20;
    if (this.sum > 200) {
      return;
    }
    this.appendItems(start, this.sum);

    this.direction = 'down';
  }
  generateWord(): string {
    return 'hola';
  }

















  ngOnInit(): void {
    this.encoded = this.route.snapshot.params.buscar;
    console.log('code: ', this.encoded);
    this.corruptEncoded = this.checkDecodedStringWasNotCorrupted(this.encoded);


    console.log(this.corruptEncoded);
    console.log(this.decoded);


    /* this.paginator._intl.itemsPerPageLabel = 'Resultados por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior'; */

  }
  onScroll(): void {
    console.log('scrolled!!');
  }
  checkDecodedStringWasNotCorrupted(encoded: string): boolean {
    try {
      this.decoded = JSON.parse(this.crytojs.decode(encoded));
      return false;
    } catch (error) {
      return true;
    }
  }
  initArticulosChanged(): void {
    this.articulosChanged$ = this.buscarService.articulosChanged.subscribe(
      (articulos: BuscarArticulo[]) => {
        console.log('BUscar: ', articulos);
        this.corruptEncoded = articulos.length === 0 ? true : false;
        if (this.filtrar !== 0) {
          this.articulos = this.filtrar === 1 ? articulos.sort(this.filtrarArticulos('precio')) : articulos.sort(this.filtrarArticulos('precio', 'desc'));
        } else {
          this.articulos = articulos;
        }
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
        this.articulos.sort(this.filtrarArticulos('id_articulo', 'desc'));
        break;
      case 1:
        this.articulos.sort(this.filtrarArticulos('precio'));
        break;
      case 2:
        this.articulos.sort(this.filtrarArticulos('precio', 'desc'));
        break;
      default:
        break;
    }
    this.filtrar = filtrar;
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

  ngOnDestroy(): void {
    this.articulosChanged$.unsubscribe();
  }
}
