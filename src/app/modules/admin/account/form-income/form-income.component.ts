import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/core/account/account.service';
import { LocalstorageService } from 'app/core/persistence/localstorage.service';
import moment, { months } from 'moment';

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

  constructor(private _accountService: AccountService,
    private _localStorage: LocalstorageService,) { }

  ngOnInit(): void {
  }

  changeIsCurrentIncome(event: Event) {
    if(!this.incomeForm.value.isRecurrent){
      this.incomeForm.patchValue({ every: '' });
    }
  }

  submitForm() {
    console.log('Save Income');
    if(this.incomeForm.valid) {
      this._accountService.saveIncome(
        {
          title: this.incomeForm.value.title,
          amount: this.incomeForm.value.amount,
          gotIt: this.incomeForm.value.gotIt,
          date: this.formatDate(this.incomeForm.value.date?._i),
          account: Number(this._localStorage.account)
        }
      ).subscribe();
    }

    this.incomeForm.setValue(
      {
        title: '',
        amount: null,
        isRecurrent: false,
        every: '',
        date: null,
        gotIt: false
      }
    )

    this.incomeForm.clearAsyncValidators();
    this.incomeForm.clearValidators();
    this.incomeForm.markAsPending();
    this.incomeForm.untouched;
  }

  formatDate(date: {date: number, month: number, year: number}) { 
    const m = date.month + 1;
    const month = Number(m) <= 9 ? '0' + m : m;
    const d = date.date + 1;
    const day = Number(d) <= 9 ? '0' + d : d;
    return date.year + '-' + month + '-' + day;
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
