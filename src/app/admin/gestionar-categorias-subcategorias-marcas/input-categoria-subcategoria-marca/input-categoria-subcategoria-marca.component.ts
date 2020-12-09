import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-categoria-subcategoria-marca',
  templateUrl: './input-categoria-subcategoria-marca.component.html',
  styleUrls: ['./input-categoria-subcategoria-marca.component.scss']
})
export class InputCategoriaSubcategoriaMarcaComponent implements OnInit {

  editado = false;
  modificado = false;

  @Input() formGroupControl!: FormGroup;
  @Input() index!: number;
  @Output() removeItem = new EventEmitter<{ index: number, element: ElementRef }>();
  @Output() updateItem = new EventEmitter<{ index: number, id: number, valor: string }>();
  constructor(
    private elementRef: ElementRef
  ) {

  }

  ngOnInit(): void {
    this.formGroupControl.get('valor')?.valueChanges.subscribe(
      (valor: string) => {
        if (this.modificado) {
          this.modificado = false;
        } else {
          this.editado = true;

        }
      });
  }

  onRemoveItem(): void {
    this.removeItem.emit({ index: this.index, element: this.elementRef });
  }

  onUpdateItem(): void {
    this.updateItem.emit({
      index: this.index,
      id: this.formGroupControl.value.id,
      valor: this.formGroupControl.value.valor
    });
    this.editado = false;
    this.modificado = true;
  }

  onKeyUp($event: any): void {
    if ($event.keyCode === 13 && this.editado) {
      this.onUpdateItem();
    }
  }

}
