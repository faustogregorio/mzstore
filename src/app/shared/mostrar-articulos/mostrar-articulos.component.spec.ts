import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarArticulosComponent } from './mostrar-articulos.component';

describe('MostrarArticulosComponent', () => {
  let component: MostrarArticulosComponent;
  let fixture: ComponentFixture<MostrarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostrarArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
