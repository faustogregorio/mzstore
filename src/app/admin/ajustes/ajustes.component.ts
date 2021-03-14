import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PedidoEstado } from '../admin.model';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from 'src/app/buscar/buscar.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GestionarCategoriasSubcategoriasMarcasComponent } from '../gestionar-categorias-subcategorias-marcas/gestionar-categorias-subcategorias-marcas.component';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  agregarEstado = true;
  color = 'rgb(255,255,255)';
  estados: PedidoEstado[] = [];
  formEstado: FormGroup;
  estado: PedidoEstado = { id_pedido_estado: 0, pedido_estado: '', estado_color: '' };
  @ViewChild('estado') estadoElementRef?: ElementRef;

  categoriaForm: FormGroup;
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: Marca[] = [];
  constructor(
    private adminService: AdminService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet

  ) {
    this.adminService.getEstados().subscribe({
      next: (response) => {
        this.estados = response.estados;
      }
    });
    this.formEstado = this.formBuilder.group({
      pedido_estado: ['', [Validators.required, Validators.pattern('^[a-zA-ZÑñÁÉÍÓÚáéíóúa ]+$')]]
    });
    this.categoriaForm = this.formBuilder.group({
      id_categoria: ['', [Validators.required, Validators.min(1)]],
      id_subcategoria: ['', [Validators.required, Validators.min(1)]],
      id_marca: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getSubcategorias();
    this.getMarcas();
  }
  getCategorias(): void {
    this.adminService.getCategorias().subscribe(
      (response: ResponseCategoria) => {
        this.categorias = response.categorias;
      }
    );
  }
  getSubcategorias(): void {
    this.adminService.getSubcategorias().subscribe(
      (response: ResponseSubcategoria) => {
        this.subcategorias = response.subcategorias;
      }
    );
  }
  getMarcas(): void {
    this.adminService.getMarcas().subscribe(
      (response: ResponseMarca) => {
        this.marcas = response.marcas;
      }
    );
  }

  onSubmit(): void {
    console.log(this.formEstado);
    if (this.formEstado.valid) {
      const COLOR = this.setRGBValues(this.color);
      if (this.agregarEstado) {
        this.adminService.createEstado(this.formEstado.value.pedido_estado, COLOR).subscribe({
          next: (response) => {
            this.estados.push({ id_pedido_estado: response.id || 0, pedido_estado: this.formEstado.value.pedido_estado, estado_color: COLOR });
            this.openSnackBar(response.message);
          }, error: (error) => {
            this.openSnackBar(error.error ? error.error.message : 'Error desconocido!', 'ERROR', 4000);
          }, complete: () => {
            this.resetFormulario();
          }
        });
      } else {
        this.adminService.updateEstado({
          id_pedido_estado: this.estado.id_pedido_estado,
          pedido_estado: this.formEstado.value.pedido_estado,
          estado_color: COLOR
        }).subscribe({
          next: response => {
            const INDEX = this.estados.indexOf(this.estado);
            this.estados[INDEX].estado_color = COLOR;
            this.estados[INDEX].pedido_estado = this.formEstado.value.pedido_estado;
            this.openSnackBar(response.message);
          }, error: error => {
            this.openSnackBar(error.error ? error.error.message : 'Error desconocido!', 'ERROR', 4000);
          }, complete: () => {
            this.resetFormulario();
          }
        });

      }
    } else {
      this.openSnackBar('Por favor verifique el formulario', 'ERROR', 4000);
    }
  }
  editarEstado(estado: PedidoEstado): void {
    this.estado = estado;
    this.estadoElementRef?.nativeElement.focus();
    this.agregarEstado = false;
    this.formEstado.patchValue({ pedido_estado: estado.pedido_estado });
    this.color = `rgb(${estado.estado_color})`;
  }
  eliminarEstado(estado: PedidoEstado): void {
    this.adminService.deleteEstado(estado.id_pedido_estado).subscribe({
      next: response => {
        const INDEX = this.estados.indexOf(estado);
        this.estados.splice(INDEX, 1);
        this.openSnackBar(response.message);
      }, error: error => {
        this.openSnackBar(error.error ? error.error.message : 'Error desconocido!', 'ERROR', 4000);
      }
    });
  }
  openBottomSheet(opcion: string, arrayObject: Categoria[] | Subcategoria[] | Marca[]): void {
    const arrayObjectCopy: Array<{ id: number, valor: string }> = [];
    for (const item of arrayObject) {
      arrayObjectCopy.push({ id: Object.values(item)[0], valor: Object.values(item)[1] });
    }
    const bottomSheetRef = this.bottomSheet.open(GestionarCategoriasSubcategoriasMarcasComponent, {
      data: { opcion, arrayObject: arrayObjectCopy },
      disableClose: true
    });
    bottomSheetRef.afterDismissed().subscribe(
      (result: Array<{ id: number, valor: string }>) => {
        switch (opcion) {
          case 'categoria':
            const categorias: Array<{ id_categoria: number, categoria: string }> = [];
            for (const categoria of result) {
              categorias.push({ id_categoria: categoria.id, categoria: categoria.valor });
            }
            this.categorias = categorias;
            break;
          case 'subcategoria':
            const subcategorias: Array<{ id_subcategoria: number, subcategoria: string }> = [];
            for (const subcategoria of result) {
              subcategorias.push({ id_subcategoria: subcategoria.id, subcategoria: subcategoria.valor });
            }
            this.subcategorias = subcategorias;
            break;
          case 'marca':
            const marcas: Array<{ id_marca: number, marca: string }> = [];
            for (const marca of result) {
              marcas.push({ id_marca: marca.id, marca: marca.valor });
            }
            this.marcas = marcas;
            break;
          default:
            break;
        }
        /* this.updateValorMasRecienteCategoriaForm(opcion); */
      }
    );
  }

  resetFormulario(): void {
    this.color = 'rgb(255,255,255)';
    this.formEstado.reset();
    this.agregarEstado = true;
  }

  openSnackBar(message: string, action = 'ACEPTAR', duration = 3000): void {
    this.snackBar.open(message, action, { duration });
  }

  setRGBValues(rgb: string): string { // recibe rgb(255,25,255) devuelve 255,25,255
    return rgb.slice(4, -1);
  }

  setTextColor(colorRGB: string): string {
    const RGB = colorRGB.split(',');
    const SUMA = Math.round(((Number(RGB[0]) * 299) + (Number(RGB[1]) * 587) + (Number(RGB[2]) * 114)) / 1000);
    return (SUMA > 128) ? 'black' : 'white';
  }

}
