
import { GenericServerResponse } from './../admin.model';
import { map } from 'rxjs/operators';
import { Component, Inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Categoria } from 'src/app/buscar/buscar.model';
import { AdminService } from '../admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface Data {
  id: number;
  valor: string;
}

@Component({
  selector: 'app-gestionar-categorias-subcategorias-marcas',
  templateUrl: './gestionar-categorias-subcategorias-marcas.component.html',
  styleUrls: ['./gestionar-categorias-subcategorias-marcas.component.scss']
})
export class GestionarCategoriasSubcategoriasMarcasComponent implements OnInit, OnDestroy {

  arrayObjectForm: FormGroup = this.formBuilder.group({});
  form: FormGroup;
  datos: Data[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<GestionarCategoriasSubcategoriasMarcasComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { opcion: string, arrayObject: Data[] },
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
  ) {
    this.datos = this.data.arrayObject;
    const controls = this.datos.map(
      (item: Data) => {
        return this.formBuilder.group({
          id: [item.id, [Validators.required]],
          valor: [item.valor, [Validators.required]]
        });
      }
    );
    this.arrayObjectForm.addControl('lista', new FormArray(controls));
    this.form = this.formBuilder.group({
      opcion: [this.data.opcion, Validators.required],
      valor: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
  }
  get arrayLista(): Data[] {
    return this.arrayObjectForm.value.lista;
  }
  get lista(): FormArray {
    return this.arrayObjectForm.get('lista') as FormArray;
  }
  get formValor(): string {
    return this.form.get('valor')?.value;
  }

  rowFormGroup(index: number): FormGroup {
    return this.lista.controls[index] as FormGroup;
  }

  addObject(id = 0, valor: string): void {
    this.lista.insert(0, this.formBuilder.group({
      id: [id, [Validators.required]],
      valor: [valor, [Validators.required]]
    }));
  }
  onRemoveItem($event: { index: number, element: ElementRef }): void {
    const id = this.rowFormGroup($event.index).get('id')?.value;
    const valor = this.rowFormGroup($event.index).get('valor')?.value;
    switch (this.data.opcion) {
      case 'categoria':
        this.deleteCategoria($event, id, valor);
        break;
      case 'subcategoria':
        this.deleteSubcategoria($event, id, valor);
        break;
      case 'marca':
        this.deleteMarca($event, id, valor);
        break;
      default:
        break;
    }
  }
  onUpdatedItem(update: { index: number, id: number, valor: string }): void {
    switch (this.data.opcion) {
      case 'categoria':
        this.updateCategoria(update);
        break;
      case 'subcategoria':
        this.updateSubcategoria(update);
        break;
      case 'marca':
        this.updateMarca(update);
        break;
      default:
        break;
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      switch (this.data.opcion) {
        case 'categoria':
          this.createCategoria();
          break;
        case 'subcategoria':
          this.createSubcategoria();
          break;
        case 'marca':
          this.createMarca();
          break;
        default:
          break;
      }
    } else {
      this.openSnackBar(`Ingrese una ${this.data.opcion} valida`);
    }
  }
  /* CATEGORIA */
  createCategoria(): void {
    this.adminService.createCategoria({ categoria: this.formValor }).subscribe(
      (response: GenericServerResponse) => {
        this.openSnackBar(response.message);
        this.addObject(response.id, this.formValor);
        this.cleanForm();
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');
      }
    );
  }
  updateCategoria(update: { index: number, id: number, valor: string }): void {
    this.adminService.updateCategoria({ id_categoria: update.id, categoria: update.valor }).subscribe(
      (response: GenericServerResponse) => {
        this.rowFormGroup(update.index).patchValue({
          valor: update.valor
        });
        this.openSnackBar(`${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');

      }
    );
  }
  deleteCategoria($event: { index: number, element: ElementRef }, id: number, valor: string): void {
    this.adminService.deleteCategoria(id).subscribe(
      (response: GenericServerResponse) => {
        this.lista.removeAt($event.index);
        $event.element.nativeElement.remove();
        this.openSnackBar(`${valor} ${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(`${valor} ${error.error.message}`, 'Error!');
      }
    );
  }
  /* SUBCATEGORIA */
  createSubcategoria(): void {
    this.adminService.createSubcategoria({ subcategoria: this.formValor }).subscribe(
      (response: GenericServerResponse) => {
        this.openSnackBar(response.message);
        this.addObject(response.id, this.formValor);
        this.cleanForm();
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');
      }
    );
  }
  updateSubcategoria(update: { index: number, id: number, valor: string }): void {
    this.adminService.updateSubcategoria({ id_subcategoria: update.id, subcategoria: update.valor }).subscribe(
      (response: GenericServerResponse) => {
        this.rowFormGroup(update.index).patchValue({
          valor: update.valor
        });
        this.openSnackBar(`${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');

      }
    );
  }
  deleteSubcategoria($event: { index: number, element: ElementRef }, id: number, valor: string): void {
    this.adminService.deleteSubcategoria(id).subscribe(
      (response: GenericServerResponse) => {
        this.lista.removeAt($event.index);
        $event.element.nativeElement.remove();
        this.openSnackBar(`${valor} ${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(`${valor} ${error.error.message}`, 'Error!');
      }
    );
  }
  /* MARCA */
  createMarca(): void {
    this.adminService.createMarca({ marca: this.formValor }).subscribe(
      (response: GenericServerResponse) => {
        this.openSnackBar(response.message);
        this.addObject(response.id, this.formValor);
        this.cleanForm();
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');
      }
    );
  }
  updateMarca(update: { index: number, id: number, valor: string }): void {
    this.adminService.updateMarca({ id_marca: update.id, marca: update.valor }).subscribe(
      (response: GenericServerResponse) => {
        this.rowFormGroup(update.index).patchValue({
          valor: update.valor
        });
        this.openSnackBar(`${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');

      }
    );
  }
  deleteMarca($event: { index: number, element: ElementRef }, id: number, valor: string): void {
    this.adminService.deleteMarca(id).subscribe(
      (response: GenericServerResponse) => {
        this.lista.removeAt($event.index);
        $event.element.nativeElement.remove();
        this.openSnackBar(`${valor} ${response.message}`);
        this.datos = this.arrayLista;
      }, error => {
        this.openSnackBar(`${valor} ${error.error.message}`, 'Error!');
      }
    );
  }
  onDismissBottomSheet(): void {
    this.bottomSheetRef.dismiss(this.datos.sort(this.ordernarDatos()));
  }
  openSnackBar(message: string, action = 'Aceptar'): void {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }
  cleanForm(): void {
    this.form.patchValue({
      valor: ''
    });
  }
  ordernarDatos(): any {
    return (a: { id: number, valor: string }, b: { id: number, valor: string }) => {
      if (a.valor.toLowerCase() > b.valor.toLowerCase()) {
        return 1;
      }
      if (a.valor.toLowerCase() < b.valor.toLowerCase()) {
        return -1;
      }
      return 0;
    };
  }
  ngOnDestroy(): void {
    this.bottomSheetRef.dismiss(this.datos.sort(this.ordernarDatos()));
  }

}
