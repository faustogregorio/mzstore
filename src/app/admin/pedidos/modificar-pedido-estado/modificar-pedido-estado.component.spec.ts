import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarPedidoEstadoComponent } from './modificar-pedido-estado.component';

describe('ModificarPedidoEstadoComponent', () => {
  let component: ModificarPedidoEstadoComponent;
  let fixture: ComponentFixture<ModificarPedidoEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarPedidoEstadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPedidoEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
