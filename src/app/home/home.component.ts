import { Component, OnInit } from '@angular/core';
import { AESEncryptDecryptService } from '../services/aes-encrypt-decrypt.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numero = '1';

  constructor(
    private aesEncryptDescryptService: AESEncryptDecryptService
  ) {
  }

  ngOnInit(): void {
    console.log('DESENCRYPTED: ', this.aesEncryptDescryptService.encode(JSON.stringify(this.numero)));
    console.log('DESDECRYPTED: ', JSON.parse(this.aesEncryptDescryptService.decode(this.aesEncryptDescryptService.encode(JSON.stringify(this.numero)))));
  }


}
