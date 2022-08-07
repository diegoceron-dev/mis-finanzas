import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIncomeComponent } from './form-income.component';

describe('FormIncomeComponent', () => {
  let component: FormIncomeComponent;
  let fixture: ComponentFixture<FormIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIncomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
