import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBottomSheetComponent } from './default-bottom-sheet.component';

describe('DefaultBottomSheetComponent', () => {
  let component: DefaultBottomSheetComponent;
  let fixture: ComponentFixture<DefaultBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultBottomSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
