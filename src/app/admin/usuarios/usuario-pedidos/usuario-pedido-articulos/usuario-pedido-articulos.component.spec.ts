import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPedidoArticulosComponent } from './usuario-pedido-articulos.component';

describe('UsuarioPedidoArticulosComponent', () => {
  let component: UsuarioPedidoArticulosComponent;
  let fixture: ComponentFixture<UsuarioPedidoArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPedidoArticulosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPedidoArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
