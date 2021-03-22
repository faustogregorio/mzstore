import { Location } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CryptoService } from '../services/crypto.service';
declare var window: any;
@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit, AfterViewInit {
  encoded = '';
  decoded = 0;
  corruptEncoded = false;
  private history: string[] = [];

  imagenes = [
    { id: 1, path: 'https://m.media-amazon.com/images/I/61aj2CfNW1L.jpg' },
    { id: 10, path: 'https://m.media-amazon.com/images/I/51bseWUDNOL.jpg' },
    { id: 0, path: 'https://m.media-amazon.com/images/I/51QZuRpM08L.jpg' },
    { id: 2, path: 'https://m.media-amazon.com/images/I/51fN8rWFLXL.jpg' },
    { id: 3, path: 'https://images-na.ssl-images-amazon.com/images/I/81jiUqRKBcL.jpg' },
    { id: 3, path: 'https://m.media-amazon.com/images/I/71Zh6vtYQBL.jpg' },
    { id: 4, path: 'https://m.media-amazon.com/images/I/51WMia+vWYL.jpg' },
    { id: 5, path: 'https://m.media-amazon.com/images/I/812GECA1hGL.jpg' },
    { id: 6, path: 'https://m.media-amazon.com/images/I/71ernN0S4WL.jpg' },
    { id: 7, path: 'https://m.media-amazon.com/images/I/71P0MKK4HIL.jpg' },
    { id: 8, path: 'https://m.media-amazon.com/images/I/51Fv-PIiDQL.jpg' },
    { id: 9, path: 'https://m.media-amazon.com/images/I/51LxctXrZkL.jpg' },
    { id: 11, path: 'https://m.media-amazon.com/images/I/51syGoBPNyL.jpg' },
    { id: 12, path: 'https://m.media-amazon.com/images/I/61pNsQ7rWmL.jpg' },
    { id: 13, path: 'https://m.media-amazon.com/images/I/71P0MKK4HIL.jpg' },
  ];
  imagenUrl = 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5872/5872522_sd.jpg';

  constructor(
    @Inject(MAT_DIALOG_DATA) public idArticulo: number,
    private dialogRef: MatDialogRef<ArticuloComponent>,
    private cryptojs: CryptoService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router

  ) {
    console.log('idArticulo: ', this.idArticulo);
  }

  ngOnInit(): void {
    /* this.encoded = this.route.snapshot.params.id;
    this.corruptEncoded = this.checkDecodedStringWasNotCorrupted(this.encoded); */
  }
  ngAfterViewInit(): void {
    window.CI360.init();
  }
  back(): void {
    /* this.history.pop() */
    /* if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    } */
    this.dialogRef.close();
  }

  onClickCell($event: any) {
    console.log($event);
    this.imagenUrl = $event.image.path;
  }

}
