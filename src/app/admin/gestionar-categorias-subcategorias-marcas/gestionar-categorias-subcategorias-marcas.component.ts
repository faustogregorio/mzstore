import { map } from 'rxjs/operators';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Categoria } from 'src/app/buscar/buscar.model';
export interface Data {
  id: number,
  valor: string;
}

@Component({
  selector: 'app-gestionar-categorias-subcategorias-marcas',
  templateUrl: './gestionar-categorias-subcategorias-marcas.component.html',
  styleUrls: ['./gestionar-categorias-subcategorias-marcas.component.scss']
})
export class GestionarCategoriasSubcategoriasMarcasComponent implements OnInit, OnDestroy {

  arrayObjectForm = this.formBuilder.group({});

  constructor(
    private bottomSheetRef: MatBottomSheetRef<GestionarCategoriasSubcategoriasMarcasComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { opcion: string, arrayObject: Data[] },
    private formBuilder: FormBuilder
  ) {
    console.log(data);
    const controls = this.data.arrayObject.map(
      (item: Data) => {
        return this.formBuilder.group({
          id: [item.id, [Validators.required]],
          valor: [item.valor, [Validators.required]]
        });
      }
    );
    this.arrayObjectForm.registerControl('lista', new FormArray(controls));
  }
  ngOnInit(): void {
    /* this.insertarEnArrayObjectForm(); */


  }
  get lista(): FormArray {
    return this.arrayObjectForm.get('lista') as FormArray;
  }
  addObject(id: number, valor: string): void {
    this.lista.insert(0, this.formBuilder.group({
      id: [id, [Validators.required]],
      valor: [valor, [Validators.required]]
    }));
  }
  /*   mapInjetedData(): Data[] {
      const arraycopy = this.data.arrayObject.slice();
      switch (this.data.opcion) {
        case 'categorias':
          this.datos = arraycopy.map(
            (objeto: any) => {
              objeto.id = objeto.id_categoria;
              objeto.valor = objeto.categoria;
              delete objeto.id_categoria;
              delete objeto.categoria;
              return objeto;
            }
          )
          break;
        case 'subcategorias':

          break;
        case 'marcas':

          break;

        default:
          break;
      }
      return this.datos;
    }


    openLink(event: MouseEvent): void {
      // this.bottomSheetRef.dismiss();
      event.preventDefault();
    }
    insertarEnArrayObjectForm(): void {
      console.log('inserat: ', this.data.arrayObject);
      for (const dato of this.datos) {
        console.log('for: ', dato);
        this.agregarArrayObject(dato.id, dato.valor);
      } */
  /* console.log(this.data.arrayObject.map(
    (objeto: Data) => {
      objeto.id_objeto = objeto.id_categoria;
      objeto.objeto = objeto.categoria;
      delete objeto.id_categoria;
      delete objeto.categoria;
      return objeto;
    }
  ));
}*/

  /* get listaAsFormArray(): FormArray {
    return this.arrayObjectForm.get('lista') as FormArray;
  }
  */
  /*   agregarArrayObject(id: number, valor: string): void {
      this.listaAsFormArray.insert(0, this.initObject(id, valor));
    }
    initObject(id: number, valor: string): FormGroup {
      return this.formBuilder.group({
        id: [id, [Validators.required]],
        valor: [valor, [Validators.required]]
      });
    }

     */
  onRemoveItem(index: number): void {
    this.lista.removeAt(index);
  }
  ngOnDestroy(): void {
    /* switch (this.data.opcion) {
      case 'categorias':
        this.datos = this.data.arrayObject.filter(
          (objeto: any) => {
            if (objeto.id > 4) {
              objeto.id_categoria = objeto.id;
              objeto.categoria = objeto.valor;
              delete objeto.id;
              delete objeto.valor;
              return objeto;

            }
            return;

          }
        );
        console.log('ondestroy: ', this.datos);
        break;

      default:
        break;
    }
    this.bottomSheetRef.dismiss(this.datos); */
  }

}
