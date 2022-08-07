import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-income',
  templateUrl: './form-income.component.html',
  styleUrls: ['./form-income.component.scss']
})
export class FormIncomeComponent implements OnInit {
  formFieldHelpers: string[] = [''];

  incomeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', []),
    date: new FormControl(null, [Validators.required]),
    gotIt: new FormControl(false, []),
  });

  everyList = [
    {id: '1', name: 'Day of selected'},
    {id: '2', name: 'Week'},
    {id: '3', name: 'Weekly'},
    {id: '4', name: 'Month'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

  changeIsCurrentIncome(event: Event) {
    if(!this.incomeForm.value.isRecurrent){
      this.incomeForm.patchValue({ every: '' });
    }
  }

  submitForm() {
    console.log('Save Income');
    console.table(this.incomeForm);
  }

  get findEveryName(){
    return this.everyList.find((every) => every.id === this.incomeForm.value.every).name
  }

  get iHaveIncomeTextColor() {
    return this.incomeForm.value.gotIt ? 'text-primary-500' : 'text-warn-500';
  }

  get iHaveIncomeColor() {
    return this.incomeForm.value.gotIt ? 'primary' : 'warn';
  }


  get iHaveIncomeMessage() {
    if(this.incomeForm.invalid) return '';

    return this.incomeForm.value.gotIt && this.incomeForm.valid ? 'I already have this income' : 'I do not have the income yet';
  }
}
