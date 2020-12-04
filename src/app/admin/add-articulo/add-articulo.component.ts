
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from 'src/app/buscar/buscar.model';
import { AdminService } from '../admin.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseSaveArticulo } from '../admin.model';

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
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: false,
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      [],
      ['insertImage', 'insertVideo']
    ]
  };

  @ViewChild('autosize') autosize?: CdkTextareaAutosize;

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
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar
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
      id_categoria: [0, [Validators.required, Validators.min(1)]],
      id_subcategoria: [0, [Validators.required, Validators.min(1)]],
      id_marca: [0, [Validators.required, Validators.min(1)]],
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

  openSnackBar(message: string, action = 'ACEPTAR'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }

  clear(): void {
    this.fileImagenes = [];
    this.informacionBasicaForm.reset();
    this.imagenPrincipalForm.reset();
    this.categoriaForm.reset();
  }

}
