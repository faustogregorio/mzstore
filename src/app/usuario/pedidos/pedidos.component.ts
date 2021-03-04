import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido, PedidoEstado, ResponsePedidos } from 'src/app/admin/admin.model';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PedidosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['numero', 'fecha_pedido', 'pedido_estado'];
  dataSource: MatTableDataSource<Pedido>;
  expandedElement?: Pedido | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  estados!: PedidoEstado[];
  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource<Pedido>();
    this.adminService.getUsuarioPedidos(this.authService.getTokenData.data.id_usuario).subscribe(
      (response: ResponsePedidos) => {
        this.dataSource.data = response.pedidos;
      }, error => {
        this.openSnackBar(error.error ? error.error.message : 'Error desconocido!', 'ERROR');
      }
    );

    this.adminService.getPedidoEstados().subscribe(
      response => {
        this.estados = response.estados;
      }, error => {
        this.openSnackBar(error.error ? error.error.message : 'Error desconocido!', 'ERROR');
      }
    );

  }
  cuandoDeClickEnlaFila(row: Pedido): void {
    this.expandedElement = this.expandedElement === row ? null : row;
    if (!this.expandedElement) { return; }
    /* console.log(row); */
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Mostrar';
    this.paginator._intl.lastPageLabel = 'Ultimo';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atrás';
    this.paginator._intl.firstPageLabel = 'Primero';

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /* applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } */

  openSnackBar(message: string, action = 'ACEPTAR', duration = 5000): void {
    this.snackBar.open(message, action, { duration });
  }

  setFontWeight(selectedIdPedidoEstado: number, idPedidoEstado: number): number {
    return selectedIdPedidoEstado === idPedidoEstado ? 600 : 400;
  }

  setBackgroundColor(selectedIdPedidoEstado: number, idPedidoEstado: number, color: string): string {
    return selectedIdPedidoEstado === idPedidoEstado ? color : '230,230,230';
  }

  setTextColor(colorRGB: string): string {
    const RGB = colorRGB.split(',');
    const SUMA = Math.round(((Number(RGB[0]) * 299) + (Number(RGB[1]) * 587) + (Number(RGB[2]) * 114)) / 1000);
    return (SUMA > 128) ? 'black' : 'white';
  }

}
