
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { CryptoService } from '../services/crypto.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  numero = '1';
  imagenes = [
    { id: 1, path: 'https://m.media-amazon.com/images/I/61aj2CfNW1L.jpg' },
    { id: 2, path: 'https://m.media-amazon.com/images/I/51fN8rWFLXL.jpg' },
    { id: 3, path: 'https://images-na.ssl-images-amazon.com/images/I/81jiUqRKBcL.jpg'},
    { id: 3, path: 'https://m.media-amazon.com/images/I/71Zh6vtYQBL.jpg' },
    { id: 4, path: 'https://m.media-amazon.com/images/I/51WMia+vWYL.jpg' },
    { id: 5, path: 'https://m.media-amazon.com/images/I/812GECA1hGL.jpg' },
    { id: 6, path: 'https://m.media-amazon.com/images/I/71ernN0S4WL.jpg' },
    { id: 7, path: 'https://m.media-amazon.com/images/I/71P0MKK4HIL.jpg' },
    { id: 8, path: 'https://m.media-amazon.com/images/I/51Fv-PIiDQL.jpg' },
    { id: 9, path: 'https://m.media-amazon.com/images/I/51LxctXrZkL.jpg' },
    { id: 10, path: 'https://m.media-amazon.com/images/I/51bseWUDNOL.jpg' },
    { id: 11, path: 'https://m.media-amazon.com/images/I/51syGoBPNyL.jpg' },
    { id: 12, path: 'https://m.media-amazon.com/images/I/61pNsQ7rWmL.jpg' },
    { id: 13, path: 'https://m.media-amazon.com/images/I/71P0MKK4HIL.jpg' },
  ];
  autoplay = true;
  @ViewChild('carousel') carousel: any;
  cellToShow = 4;
  constructor(
    private cryptoService: CryptoService
  ) {


  }
  handleCarouselEvents($event: any): void {
    console.log($event);
  }

  ngOnInit(): void {
    console.log('DESENCRYPTED: ', this.cryptoService.encode(JSON.stringify(this.numero)));
    console.log('DESDECRYPTED: ', JSON.parse(this.cryptoService.decode(this.cryptoService.encode(JSON.stringify(this.numero)))));
  }
  ngOnDestroy(): void {
    /* this.myCarousel.stop(); */
  }

  @HostListener('window:blur', ['$event'])
  onpagehide(event: FocusEvent): void {
    console.log('evento: ', event);
    console.log('autoplay:', this.autoplay);
    console.log('carousel: ', this.carousel);
    /* this.carousel.autoplay = false; */
  }

  onClickCell($event: any): void {
    console.log($event);
  }
  cambiar(): number {
    return this.cellToShow;
  }
  acCell(): void {
    this.cellToShow = 5;
    this.imagenes = this.imagenes.filter((imagen: any) => { if (imagen) { return imagen; } });

  }

}
