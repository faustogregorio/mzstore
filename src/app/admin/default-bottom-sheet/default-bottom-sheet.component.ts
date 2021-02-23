
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Categoria, Marca, Subcategoria } from 'src/app/buscar/buscar.model';
import { environment } from 'src/environments/environment.prod';
import { Articulo } from '../admin.model';
import { AdminService } from '../admin.service';
import { GestionarCategoriasSubcategoriasMarcasComponent } from '../gestionar-categorias-subcategorias-marcas/gestionar-categorias-subcategorias-marcas.component';

@Component({
  selector: 'app-default-bottom-sheet',
  templateUrl: './default-bottom-sheet.component.html',
  styleUrls: ['./default-bottom-sheet.component.scss']
})
export class DefaultBottomSheetComponent implements OnInit, OnDestroy {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Descripción del artículo...',
    defaultParagraphSeparator: '',
    customClasses: [
      {
        name: 'Display 4',
        class: 'mat-display-4',
      },
      {
        name: 'Display 3',
        class: 'mat-display-3',
      },
      {
        name: 'Display 2',
        class: 'mat-display-2',
      },
      {
        name: 'Display 1',
        class: 'mat-display-1',
      },
      {
        name: 'Título 1',
        class: 'mat-h1',
      },
      {
        name: 'Título 2',
        class: 'mat-h2'
      },
      {
        name: 'Título 3',
        class: 'mat-h3',
      },
      {
        name: 'Título 4',
        class: 'mat-h4',
      },
      {
        name: 'Body 1',
        class: 'mat-body',
      },
      {
        name: 'Body Bold',
        class: 'mat-body-strong',
      },
      {
        name: 'Caption',
        class: 'mat-small',
      },
    ],
    sanitize: false,
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      ['heading', 'fontName'],
      ['insertImage', 'insertVideo']
    ]
  };
  imgUrl = environment.urlImagenes;
  articulo: Articulo = {
    id_articulo: 0,
    sku: '',
    articulo: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    categoria: '',
    subcategoria: '',
    marca: '',
    fecha_creacion: new Date(),
    descuento: 0,
    imagen: '',
    imagenes: []
  };
  articuloForm: FormGroup;
  categoria: Categoria = { id_categoria: 0, categoria: '' };
  subcategoria: Subcategoria = { id_subcategoria: 0, subcategoria: '' };
  marca: Marca = { id_marca: 0, marca: '' };
  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: Marca[] = [];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<DefaultBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { opcion: string, id_articulo: number },
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {
    this.getArticulo();
    this.articuloForm = this.formBuilder.group({
      sku: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9_-]+$')]],
      articulo: [this.articulo.articulo, [Validators.required]],
      descripcion: [this.articulo.descripcion, [Validators.required]],
      precio: [this.articulo.precio, [Validators.required, Validators.pattern('[0-9]+')]],
      stock: [this.articulo.stock, [Validators.required, Validators.pattern('[0-9]+')]],
      descuento: [this.articulo.descuento, [Validators.required, Validators.pattern('[0-9]+'), Validators.max(100)]],
      id_categoria: ['', [Validators.required]],
      id_subcategoria: ['', [Validators.required]],
      id_marca: ['', [Validators.required]]
    });
  }
  chooseWhichOneToGetCategoriaSubcategoriaMarca(): void {
    switch (this.data.opcion) {
      case 'edit-categoria':
        this.getCategorias();
        this.articuloForm.get('id_categoria')?.valueChanges.subscribe((idCategoria: number) => {
          if (idCategoria === 0) {
            this.openBottomSheet('categoria', this.categorias);
          }
        });
        break;
      case 'edit-subcategoria':
        this.getSubcategorias();
        this.articuloForm.get('id_subcategoria')?.valueChanges.subscribe((idSubcategoria: number) => {
          if (idSubcategoria === 0) {
            this.openBottomSheet('subcategoria', this.subcategorias);
          }
        });
        break;
      case 'edit-marca':
        this.getMarcas();
        this.articuloForm.get('id_marca')?.valueChanges.subscribe((idMarca: number) => {
          if (idMarca === 0) {
            this.openBottomSheet('marca', this.marcas);
          }
        });
        break;
      default:
        break;
    }
  }
  getCategorias(): void {
    this.adminService.getCategorias().subscribe(
      response => {
        this.categorias = response.categorias;
        this.categoria = this.categorias.find((categoria) => {
          if (categoria.categoria === this.articulo.categoria) {return true; }
          return;
        }) || this.categoria;
        this.articuloForm.patchValue({ id_categoria: this.categoria.id_categoria });
      }, error => {
        this.openSnackBar(error.error.message || 'Error desconocido', 'Error!');
      }
    );
  }
  getSubcategorias(): void {
    this.adminService.getSubcategorias().subscribe(
      response => {
        this.subcategorias = response.subcategorias;
        this.subcategoria = this.subcategorias.find(subcategoria => {
          if (subcategoria.subcategoria === this.articulo.subcategoria) {return true; }
          return false;
        }) || this.subcategoria;
        this.articuloForm.patchValue({ id_subcategoria: this.subcategoria.id_subcategoria });
      }, error => {
        this.openSnackBar(error.error.message || 'Error desconocido', 'Error!');
      }
    );
  }
  getMarcas(): void {
    this.adminService.getMarcas().subscribe(
      response => {
        this.marcas = response.marcas;
        this.marca = this.marcas.find(marca => {
          if (marca.marca === this.articulo.marca) {return true; }
          return false;
        }) || this.marca;
        this.articuloForm.patchValue({ id_marca: this.marca.id_marca });
      }, error => {
        this.openSnackBar(error.error.message || 'Error desconocido', 'Error!')
      }
    );
  }
  getArticulo(): void {
    this.adminService.getArticulo(this.data.id_articulo).subscribe(
      response => {
        console.log(response);
        this.articulo = response.articulo;
        this.articuloForm.patchValue({
          sku: this.articulo.sku,
          articulo: this.articulo.articulo,
          descripcion: this.articulo.descripcion,
          precio: this.articulo.precio,
          stock: this.articulo.stock,
          descuento: this.articulo.descuento
        });
        this.chooseWhichOneToGetCategoriaSubcategoriaMarca();
      }, error => {
        this.openSnackBar(error.error.message, 'Error!');
        this.bottomSheetRef.dismiss();
      }
    );
  }
  get descuentoValor(): number {
    return this.articuloForm.get('descuento')?.value;
  }
  onKeyUp($event: any, update: string) {
    console.log(this.articuloForm);
    if ($event.keyCode === 13) {
      this.onUpdate(update);
    }
  }

  onUpdate(update: string): void {
    console.log(update);
    if (this.articuloForm.controls[update].pristine
      || this.articuloForm.controls[update].invalid) { return; }
    switch (update) {
      case 'sku':
      case 'articulo':
      case 'descripcion':
      case 'precio':
      case 'stock':
      case 'id_categoria':
      case 'id_subcategoria':
      case 'id_marca':
        this.updateArticulo(update);
        break;
      case 'descuento':
        this.updateDescuento(update);
        break;

      default:
        break;
    }
  }
  updateArticulo(update: string): void {
    this.adminService.updateArticulo(this.data.id_articulo, update, this.articuloForm.get(update)?.value).subscribe(
      response => {
        this.openSnackBar(response.message);
        this.onDismissBottomSheet(update);
      }, error => {
        this.openSnackBar(error.error.message ? error.error.message : 'Error no esperado', 'Error!');
      }
    );
  }

  onDismissBottomSheet(update: string): void {
    /* Descripcion del articulo no es necesario ser actualizado en la vista de la tabla */
    if (update === 'descripcion') {
      this.bottomSheetRef.dismiss();
    } else if (update === 'id_categoria') {
      this.categoria = this.categorias.find((categoria) => {
        if (categoria.id_categoria === this.articuloForm.value.id_categoria) { return true; }
        return;
      }) || this.categoria;
      this.bottomSheetRef.dismiss(this.categoria.categoria);
    } else if (update === 'id_subcategoria') {
      this.subcategoria = this.subcategorias.find((subcategoria) => {
        if (subcategoria.id_subcategoria === this.articuloForm.value.id_subcategoria) { return true; }
        return;
      }) || this.subcategoria;
      this.bottomSheetRef.dismiss(this.subcategoria.subcategoria);
    } else if (update === 'id_marca') {
      this.marca = this.marcas.find((marca) => {
        if (marca.id_marca === this.articuloForm.value.id_marca) { return true; }
        return;
      }) || this.marca;
      this.bottomSheetRef.dismiss(this.marca.marca);
    } else {
      this.bottomSheetRef.dismiss(this.articuloForm.get(update)?.value);
    }
  }

  updateDescuento(update: string): void {
    this.adminService.updateArticulo(
      this.data.id_articulo,
      update,
      { descuento: this.articuloForm.get(update)?.value, update: this.articulo.descuento === null ? false : true }
      ).subscribe(
      response => {
        this.openSnackBar(response.message);
        this.bottomSheetRef.dismiss(this.articuloForm.get(update)?.value);
      }, error => {
        this.openSnackBar(error.error.message ? error.error.message : 'Error no esperado', 'Error!');
      }
    );
  }

  openBottomSheet(opcion: string, arrayObject: Categoria[] | Subcategoria[] | Marca[]): void {
    const arrayObjectCopy: Array<{ id: number, valor: string }> = [];
    for (const item of arrayObject) {
      arrayObjectCopy.push({ id: Object.values(item)[0], valor: Object.values(item)[1] });
    }
    this.bottomSheet.open(GestionarCategoriasSubcategoriasMarcasComponent, {
      data: { opcion, arrayObject: arrayObjectCopy },
      disableClose: true
    });
    this.bottomSheetRef.dismiss();
  }


  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    /* this.bottomSheetRef.dismiss(this.data); */
  }

  openSnackBar(message: string, action = 'Aceptar'): void {
    this.snackBar.open(message, action, {
      duration: 3000
    })
  }

  verificarError(controlName: string, errorName: string): boolean {
    return this.articuloForm.controls[controlName].hasError(errorName);
  }

  calcularDescuento(): number {
    return this.articuloForm.controls['descuento'].invalid ? 0 : Math.trunc(this.articulo.precio * this.descuentoValor / 100);
  }

}
