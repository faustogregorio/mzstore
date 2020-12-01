import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() menuClicked = new EventEmitter<string>();
  @Input() esAdmin?: boolean;
  @Input() isAuthenticated?: boolean;

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  constructor(
    private router: Router
  ) {
    /* this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      ); */
  }

  ngOnInit(): void {
    console.log(this.esAdmin);

  }

  /* private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  } */

  redirectTo(route: string): void {
    this.menuClicked.emit('cerrar');
    this.router.navigate([route]);
  }

  clickMenu(clicked: string): void {
    if (this.isAuthenticated || clicked === 'principal') {
      this.menuClicked.emit(clicked);

    } else {
      localStorage.removeItem('Authorization');
      this.router.navigate(['/auth/login']);
    }
  }


}
