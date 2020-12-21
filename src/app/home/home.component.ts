import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numero = '1';

  constructor(
    private cryptoService: CryptoService
  ) {
  }

  ngOnInit(): void {
    console.log('DESENCRYPTED: ', this.cryptoService.encode(JSON.stringify(this.numero)));
    console.log('DESDECRYPTED: ', JSON.parse(this.cryptoService.decode(this.cryptoService.encode(JSON.stringify(this.numero)))));
  }


}
