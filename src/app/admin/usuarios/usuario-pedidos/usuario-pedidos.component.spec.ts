import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPedidosComponent } from './usuario-pedidos.component';

describe('UsuarioPedidosComponent', () => {
  let component: UsuarioPedidosComponent;
  let fixture: ComponentFixture<UsuarioPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
