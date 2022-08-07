import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'form-expense',
  templateUrl: './form-expense.component.html',
  styleUrls: ['./form-expense.component.scss']
})
export class FormExpenseComponent implements OnInit {
  formFieldHelpers: string[] = [''];

  expenseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', []),
    date: new FormControl(null, [Validators.required]),
    paidIt: new FormControl(false, []),
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

  changeIsCurrentExpense(event: Event) {
    if(!this.expenseForm.value.isRecurrent){
      this.expenseForm.patchValue({ every: '' });
    }
  }

  submitForm() {
    console.log('Save Expense');
  }

  get findEveryName(){
    return this.everyList.find((every) => every.id === this.expenseForm.value.every).name
  }

  get iHaveExpenseTextColor() {
    return this.expenseForm.value.paidIt ? 'text-primary-500' : 'text-warn-500';
  }

  get iHaveExpenseColor() {
    return this.expenseForm.value.paidIt ? 'primary' : 'warn';
  }

  get iHaveExpenseMessage() {
    if(this.expenseForm.invalid) return '';

    return this.expenseForm.value.paidIt && this.expenseForm.valid ? 'I already have this expense' : 'I do not have the expense yet';
  }
}
