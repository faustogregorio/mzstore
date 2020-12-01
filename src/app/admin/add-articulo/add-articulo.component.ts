
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Categoria, Marca, ResponseCategoria, ResponseMarca, ResponseSubcategoria, Subcategoria } from 'src/app/buscar/buscar.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class AddArticuloComponent implements OnInit {
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
    private adminService: AdminService
    ) {
    this.informacionBasicaForm = this.formBuilder.group({
      articulo: ['', Validators.required],
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

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }

}
