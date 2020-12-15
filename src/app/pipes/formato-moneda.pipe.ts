import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda'
})
export class FormatoMonedaPipe implements PipeTransform {

  transform(precio: number,): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MXN' }).format(precio);
  }

}
