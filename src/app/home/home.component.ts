import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numero = '1';
  imagenes = [
    { path: 'https://mzstore.mx/modules/ps_imageslider/images/7cdb02766c6e0bca5c8cf7bc6d754bdd43b0570a_lona.png'},
    { path: 'https://i.pinimg.com/originals/c4/65/70/c46570a12761ae3fd77f50150678e9c5.jpg'},
    { path: 'https://mzstore.mx/modules/ps_imageslider/images/0a9c6230bf4b91c273c43483b750aa9a935c1cfa_Captura%20de%20pantalla%202020-10-29%2011.12.37.png'},
    { path: 'https://images.squarespace-cdn.com/content/v1/552789b3e4b05cd6d50d1f1f/1516080804224-5DE07CG9UL0LUD1ML2QB/ke17ZwdGBToddI8pDm48kCf3-plT4th5YDY7kKLGSZN7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0h8vX1l9k24HMAg-S2AFienIXE1YmmWqgE2PN2vVFAwNPldIHIfeNh3oAGoMooVv2g/Nocte1.jpg'},
    { path: 'https://pbs.twimg.com/media/CrqyYIfVMAACRNR.jpg'},
    { path: 'https://images.squarespace-cdn.com/content/v1/552789b3e4b05cd6d50d1f1f/1516685291049-KGXRH1E502IWWDW9T39R/ke17ZwdGBToddI8pDm48kMXRibDYMhUiookWqwUxEZ97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0luUmcNM2NMBIHLdYyXL-Jww_XBra4mrrAHD6FMA3bNKOBm5vyMDUBjVQdcIrt03OQ/Morn2.jpg'},
    { path: 'https://estodata.storage.googleapis.com/nota-bellezas-mahafsoun2.jpg'},
    { path: 'https://41.media.tumblr.com/d14bc2048333075dbe7fe1d90ed346f8/tumblr_n5qtkza1x11rnnvk5o1_540.jpg'},
    { path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbiK8eO8nRVPfD2P7kHdzJAyELUmZdII8IEA&usqp=CAU'},
    { path: 'https://www.gothicandamazing.com/wp-content/uploads/2016/08/Mahafsoun_Interview-6.jpg'},
    { path: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f0d95f16-f7c1-4629-8170-e297cf1a331f/d5ichiq-87e4d9c0-0143-4554-93b5-22b477ca40bc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvZjBkOTVmMTYtZjdjMS00NjI5LTgxNzAtZTI5N2NmMWEzMzFmXC9kNWljaGlxLTg3ZTRkOWMwLTAxNDMtNDU1NC05M2I1LTIyYjQ3N2NhNDBiYy5qcGcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.Caq2LVLCWYS-CygOVEnARAm7RXiYn2WevD9zO7BXie4'},
    { path: 'https://i.redd.it/d8c6g2nswd121.jpg'},
  ];

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


}
