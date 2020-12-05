import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCategoriaSubcategoriaMarcaComponent } from './input-categoria-subcategoria-marca.component';

describe('InputCategoriaSubcategoriaMarcaComponent', () => {
  let component: InputCategoriaSubcategoriaMarcaComponent;
  let fixture: ComponentFixture<InputCategoriaSubcategoriaMarcaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCategoriaSubcategoriaMarcaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCategoriaSubcategoriaMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
