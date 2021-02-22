import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment.prod';
import { ResponseUsuarios, Usuario } from '../admin.model';
import { AdminService } from '../admin.service';
import { DefaultBottomSheetComponent } from '../default-bottom-sheet/default-bottom-sheet.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsuariosComponent implements OnInit, AfterViewInit {
  /* imgDomain = environment.urlImagenes; */
  selectedIdUsuario = 0;
  selectedIndexUsuario = 0;
  displayedColumns: string[] = ['nombre', 'telefono', 'pedidos'];
  dataSource: MatTableDataSource<Usuario>;
  expandedElement?: Usuario | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private adminService: AdminService,
    private bottomSheet: MatBottomSheet,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Usuario>();
    this.adminService.getUsuarios().subscribe(
      (response: ResponseUsuarios) => {
        console.log(response);
        this.dataSource.data = response.usuarios;
      }, error => {
        console.log(error);
      }
    );

  }
  ngOnInit(): void {
    /* this.adminService.getUsuarios().subscribe(
      response => {
        console.log(response);
      }, error => {
        console.log(error);
      }
    ); */
  }

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
  updateSelectedUsuarioId(idArticulo: number, index: number): void {
    this.selectedIdUsuario = idArticulo;
    this.selectedIndexUsuario = index;
    console.log(this.selectedIdUsuario);
  }

  openBottomSheet(opcion: string, id: number, index: number): void {
    this.updateSelectedUsuarioId(id, index);
    const bottomSheetRef = this.bottomSheet.open(DefaultBottomSheetComponent, {
      data: { opcion, id_usuario: id },
      autoFocus: true

    });

    bottomSheetRef.afterDismissed().subscribe(
      result => {
        console.log(' Result: ', result);
        if (result) {
          this.updateUsuario(result, opcion);
        }
      }
    );
  }
  updateUsuario(result: any, opcion: string): void {
    /* switch (opcion) {
      case 'edit-articulo':
        this.dataSource.data[this.selectedIndexUsuario].articulo = result;
        break;
      case 'edit-precio':
        this.dataSource.data[this.selectedIndexUsuario].precio = result;
        break;
      case 'edit-stock':
        this.dataSource.data[this.selectedIndexUsuario].stock = result;
        break;
      case 'edit-categoria':
        this.dataSource.data[this.selectedIndexUsuario].categoria = result;
        break;
      case 'edit-subcategoria':
        this.dataSource.data[this.selectedIndexUsuario].subcategoria = result;
        break;
      case 'edit-marca':
        this.dataSource.data[this.selectedIndexUsuario].marca = result;
        break;
      case 'edit-imagenes':

        break;
      case 'edit-descuento':
        this.dataSource.data[this.selectedIndexUsuario].descuento = result;
        break;


      default:
        break;
    } */
  }

  deleteArticulo(idArticulo: number, index: number): void {
    this.updateSelectedUsuarioId(idArticulo, index);
    this.confirmDelete('¿Está seguro que quiere eliminar el artículo?');
  }

  openSnackBar(message: string, action = 'ACEPTAR'): void {
    this.snackBar.open(message, action, { duration: 5000 });
  }

  confirmDelete(message: string, action = 'SÍ, ¡ELIMÍNALO!'): void {
    const snackBarRef = this.snackBar.open(message, action, { duration: 5000 });

    snackBarRef.onAction().subscribe(() => {
      this.adminService.deleteArticulo(this.selectedIdUsuario).subscribe(
        response => {
          this.openSnackBar(response.message);
          this.dataSource.data.splice(this.selectedIndexUsuario, 1);
          this.dataSource.data = this.dataSource.data;
        }, error => {
          console.log(error);
          this.openSnackBar(error.message, 'ERROR!');
        }
      );
    });
  }
}
