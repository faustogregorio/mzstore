import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-categoria-subcategoria-marca',
  templateUrl: './input-categoria-subcategoria-marca.component.html',
  styleUrls: ['./input-categoria-subcategoria-marca.component.scss']
})
export class InputCategoriaSubcategoriaMarcaComponent implements OnInit {

  @Input() formGroupControl?: FormGroup;
  @Input() index?: number;
  @Output() removeItem = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.formGroupControl, this.index);
  }

  onRemoveItem(): void {
    this.removeItem.emit(this.index);
  }

  get id(): number {
    return this.formGroupControl?.get('id')?.value;
  }

  get valor(): string {
    return this.formGroupControl?.get('valor')?.value;
  }

}
