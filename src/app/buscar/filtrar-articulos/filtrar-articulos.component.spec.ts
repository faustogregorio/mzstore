import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrarArticulosComponent } from './filtrar-articulos.component';

describe('FiltrarArticulosComponent', () => {
  let component: FiltrarArticulosComponent;
  let fixture: ComponentFixture<FiltrarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltrarArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
