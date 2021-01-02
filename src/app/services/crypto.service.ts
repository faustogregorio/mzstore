import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var CryptoJS: any;

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  secretKey = environment.secretKey;
  constructor() { }

  AESencrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey).toString();
  }

  AESdecrypt(encryptedValue: string): string {
    return CryptoJS.AES.decrypt(encryptedValue, this.secretKey).toString(CryptoJS.enc.Utf8);
  }

  encode(value: string): string {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
  }

  decode(encodedValue: string): string {
      return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(encodedValue));
  }
}
