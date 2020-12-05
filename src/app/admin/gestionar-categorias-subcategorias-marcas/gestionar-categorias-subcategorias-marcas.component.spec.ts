import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCategoriasSubcategoriasMarcasComponent } from './gestionar-categorias-subcategorias-marcas.component';

describe('GestionarCategoriasSubcategoriasMarcasComponent', () => {
  let component: GestionarCategoriasSubcategoriasMarcasComponent;
  let fixture: ComponentFixture<GestionarCategoriasSubcategoriasMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCategoriasSubcategoriasMarcasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCategoriasSubcategoriasMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
