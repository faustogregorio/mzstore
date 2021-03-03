import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GenericServerResponse, Pedido, PedidoEstado, ResponsePedidos } from '../admin.model';
import { AdminService } from '../admin.service';
import { ModificarPedidoEstadoComponent } from './modificar-pedido-estado/modificar-pedido-estado.component';

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
  displayedColumns: string[] = ['id_pedido', 'fecha_pedido', 'pedido_estado'];
  dataSource: MatTableDataSource<Pedido>;
  expandedElement?: Pedido | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  estados!: PedidoEstado[];
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Pedido>();
    this.adminService.getPedidos().subscribe(
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(index: number, idPedido: number, idEstado: number, color: string, estado: string): void {
    const dialogRef = this.dialog.open(ModificarPedidoEstadoComponent, {
      data: { idPedido, idEstado },
      autoFocus: false,
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(
      (result: GenericServerResponse) => {
        console.log(' Result: ', result);
        if (result) {
          if (result.success) {
            this.dataSource.data[index].id_pedido_estado = idEstado;
            this.dataSource.data[index].estado_color = color;
            this.dataSource.data[index].pedido_estado = estado;
            this.openSnackBar(result.message, undefined, 3000);
          } else {
            this.openSnackBar(result.message, 'ERROR');
          }
        }
      }
    );
  }

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
