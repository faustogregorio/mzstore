import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AdminService } from './../admin.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Articulo, ResponseArticulos } from '../admin.model';
import { environment } from 'src/environments/environment.prod';
import { DefaultBottomSheetComponent } from '../default-bottom-sheet/default-bottom-sheet.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ArticulosComponent implements OnInit, AfterViewInit {
  imgDomain = environment.urlImagenes;
  selectedIdArticulo = 0;
  selectedIndexArticulo = 0;
  displayedColumns: string[] = ['sku', 'articulo', 'precio', 'descuento', 'stock'];
  dataSource: MatTableDataSource<Articulo>;
  expandedElement?: Articulo | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private adminService: AdminService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Articulo>();
    this.adminService.getArticulos().subscribe(
      (response: ResponseArticulos) => {
        console.log(response);
        this.dataSource.data = response.articulos;
      }, error => {
        console.log(error);
      }
    );

  }
  ngOnInit(): void {

  }

  ngAfterViewInit() {
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
  updateSelectedArticuloId(idArticulo: number, index: number): void {
    this.selectedIdArticulo = idArticulo;
    this.selectedIndexArticulo = index;
    console.log(this.selectedIdArticulo);
  }

  openBottomSheet(opcion: string, id: number, index: number): void {
    this.updateSelectedArticuloId(id, index);
    const bottomSheetRef = this.bottomSheet.open(DefaultBottomSheetComponent, {
      data: { opcion, id_articulo: id },
      autoFocus: true

    });

    bottomSheetRef.afterDismissed().subscribe(
      result => {
        console.log(' Result: ', result);
        if (result) {
          this.updateArticulo(result, opcion);
        }
      }
    );
  }
  updateArticulo(result: any, opcion: string): void {
    switch (opcion) {
      case 'edit-sku':
        this.dataSource.data[this.selectedIndexArticulo].sku = result;
        break;
      case 'edit-articulo':
        this.dataSource.data[this.selectedIndexArticulo].articulo = result;
        break;
      case 'edit-precio':
        this.dataSource.data[this.selectedIndexArticulo].precio = result;
        break;
      case 'edit-stock':
        this.dataSource.data[this.selectedIndexArticulo].stock = result;
        break;
      case 'edit-categoria':
        this.dataSource.data[this.selectedIndexArticulo].categoria = result;
        break;
      case 'edit-subcategoria':
        this.dataSource.data[this.selectedIndexArticulo].subcategoria = result;
        break;
      case 'edit-marca':
        this.dataSource.data[this.selectedIndexArticulo].marca = result;
        break;
      case 'edit-imagenes':

        break;
      case 'edit-descuento':
        this.dataSource.data[this.selectedIndexArticulo].descuento = result;
        break;


      default:
        break;
    }
  }

  deleteArticulo(idArticulo: number, index: number): void {
    this.updateSelectedArticuloId(idArticulo, index);
    this.confirmDelete('¿Está seguro que quiere eliminar el artículo?');
  }

  openSnackBar(message: string, action = 'ACEPTAR'): void {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  confirmDelete(message: string, action = 'SÍ, ¡ELIMÍNALO!'): void {
    const snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.onAction().subscribe(() => {
      this.adminService.deleteArticulo(this.selectedIdArticulo).subscribe(
        response => {
          this.openSnackBar(response.message);
          this.dataSource.data.splice(this.selectedIndexArticulo, 1);
          this.dataSource.data = this.dataSource.data;
        }, error => {
          console.log(error);
          this.openSnackBar(error.error ? error.error.message : '!Error desconocido!');
        }
      );
    });
  }
}
