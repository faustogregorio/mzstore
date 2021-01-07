import { Location } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {
  encoded = '';
  decoded = 0;
  corruptEncoded = false;
  private history: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public idArticulo: number,
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

  back(): void {
    /* this.history.pop() */
    /* if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    } */
  }

}
