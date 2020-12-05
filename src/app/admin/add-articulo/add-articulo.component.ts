
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from 'src/app/buscar/buscar.model';
import { AdminService } from '../admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseSaveArticulo } from '../admin.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GestionarCategoriasSubcategoriasMarcasComponent } from '../gestionar-categorias-subcategorias-marcas/gestionar-categorias-subcategorias-marcas.component';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AddArticuloComponent implements OnInit {
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
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
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
      ['heading'],
      ['insertImage', 'insertVideo']
    ]
  };

  informacionBasicaForm: FormGroup;
  imagenPrincipalForm: FormGroup;
  categoriaForm: FormGroup;

  @ViewChild('files', { static: true }) files?: ElementRef;
  imagenes = new Array<string>();
  fileImagenes = [];

  categorias: Categoria[] = [];
  subcategorias: Subcategoria[] = [];
  marcas: Marca[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet
  ) {
    this.informacionBasicaForm = this.formBuilder.group({
      articulo: ['', [Validators.required, Validators.pattern('^[^]+$')]],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    });
    this.imagenPrincipalForm = this.formBuilder.group({
      imagen: ['', Validators.required]
    });
    this.categoriaForm = this.formBuilder.group({
      id_categoria: ['', [Validators.required, Validators.min(1)]],
      id_subcategoria: ['', [Validators.required, Validators.min(1)]],
      id_marca: ['', [Validators.required, Validators.min(1)]],
    });

    this.categoriaForm.get('id_categoria')?.valueChanges.subscribe((idCategoria: number) => {
      if (idCategoria === 0) {
        this.openBottomSheet('categorias', this.categorias);
      }
    });
    this.categoriaForm.get('id_subcategoria')?.valueChanges.subscribe((idSubcategoria: number) => {
      if (idSubcategoria === 0) {
        this.openBottomSheet('subcategorias', this.subcategorias);
      }
    });
    this.categoriaForm.get('id_marca')?.valueChanges.subscribe((idMarca: number) => {
      if (idMarca === 0) {
        this.openBottomSheet('marcas', this.marcas);
      }
    });
  }

  get descripcion(): string {
    return this.informacionBasicaForm.get('descripcion')?.value;
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
  onFileChangeImagenes(event: any): void {
    this.imagenes = [];
    this.fileImagenes = event.target.files;
    if (this.fileImagenes.length > 0) {
      this.imagenPrincipalForm.patchValue({
        imagen: 'existe imagen'
      });
      for (const file of this.fileImagenes) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagenes.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addFileImagenes(): void {
    this.files?.nativeElement.click();
  }

  get articulo(): string {
    return this.informacionBasicaForm.get('articulo')?.value;
  }

  saveArticulo(): void {
    if (this.informacionBasicaForm.valid && this.fileImagenes.length > 0 && this.categoriaForm.valid) {
      let formData = new FormData();
      formData = Object.assign(this.appendImagenes(formData), this.appendAtributosDelArticulo(formData));

      console.log('FORMDATA: ', formData);
      this.adminService.saveArticulo(formData).subscribe(
        (response: ResponseSaveArticulo) => {
          console.log(response);
          this.openSnackBar(response.message);
          this.clear();
        }
      );


    } else {
      this.openSnackBar('Operación no valida, verifique por favor');
    }
  }

  appendImagenes(formData: FormData): FormData {
    for (const file of this.fileImagenes) {
      formData.append('imagenes[]', file);
    }
    return formData;
  }

  appendAtributosDelArticulo(formData: FormData): FormData {
    const articulo = Object.assign(this.informacionBasicaForm.value, this.categoriaForm.value);
    formData.append('articulo', JSON.stringify(articulo));
    return formData;
  }

  openBottomSheet(opcion: string, arrayObject: Categoria[] | Subcategoria[] | Marca[]): void {
    const arrayObjectCopy: Array<{ id: number, valor: string }> = [];
    for (const item of arrayObject) {
      arrayObjectCopy.push({ id: Object.values(item)[0], valor: Object.values(item)[1] });
    }
    const bottomSheetRef = this.bottomSheet.open(GestionarCategoriasSubcategoriasMarcasComponent, {
      data: { opcion, arrayObject: arrayObjectCopy },
      disableClose: false
    });
    bottomSheetRef.afterDismissed().subscribe(
      (result) => {
        /* console.log('me la di: ', result);
        console.log(opcion);
        this.categorias = result; */
        this.updateValorMasRecienteCategoriaForm(opcion);
      }
    );
  }

  updateValorMasRecienteCategoriaForm(opcion: string): void {
    console.log(this.categorias);
    switch (opcion) {
      case 'categorias':
        this.categoriaForm.patchValue({
          id_categoria: Math.max(...this.categorias.map(categoria => categoria.id_categoria))
        });
        break;
      case 'subcategorias':
        this.categoriaForm.patchValue({
          id_subcategoria: Math.max(...this.subcategorias.map(subcategoria => subcategoria.id_subcategoria))
        });
        break;
      case 'marcas':
        this.categoriaForm.patchValue({
          id_marca: Math.max(...this.marcas.map(marca => marca.id_marca))
        });
        break;
      default:
        break;
    }
  }

  openSnackBar(message: string, action = 'ACEPTAR'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  clear(): void {
    this.fileImagenes = [];
    this.informacionBasicaForm.reset();
    this.imagenPrincipalForm.reset();
    this.categoriaForm.reset();
  }

}
