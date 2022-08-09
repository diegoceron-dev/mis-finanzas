import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseAlertService } from '@fuse/components/alert';
import { AccountService } from 'app/core/account/account.service';
import { LocalstorageService } from 'app/core/persistence/localstorage.service';

@Component({
  selector: 'form-expense',
  templateUrl: './form-expense.component.html',
  styleUrls: ['./form-expense.component.scss']
})
export class FormExpenseComponent implements OnInit {

  expenseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', []),
    date: new FormControl(null, [Validators.required]),
    paidIt: new FormControl(false, []),
  });

  everyList = [
    { id: '1', name: 'Day of selected' },
    { id: '2', name: 'Week' },
    { id: '3', name: 'Weekly' },
    { id: '4', name: 'Month' },
  ]

  alert = {
    title: '',
    message: '',
    type: 'primary'
  }

  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalstorageService,
    private _fuseAlertService: FuseAlertService
  ) {
  }

  ngOnInit(): void {
  }

  changeIsCurrentExpense(event: Event) {
    if (!this.expenseForm.value.isRecurrent) {
      this.expenseForm.patchValue({ every: '' });
    }
  }

  submitForm() {
    console.log('Save Expense');
    if (this.expenseForm.valid) {
      this._accountService
        .saveExpense({
          title: this.expenseForm.value.title,
          amount: this.expenseForm.value.amount,
          paidIt: this.expenseForm.value.paidIt,
          date: this.expenseForm.value.date?._i,
          account: Number(this._localStorage.account),
        })
        .subscribe(
          res => {
            console.log(res);
            this.clearComponent();
            this.alert.message = 'The expense has been saved successfully';
            this.alert.title = 'Successful operation';
            this.alert.type = 'primary';
            this.showAlert('alertExpense');
          },
          err => {
            console.log(err);
            this.alert.message = err.message;
            this.alert.title = 'Error operation';
            this.alert.type = 'error';
            this.showAlert('alertExpense');
          },
          () => {
            setTimeout(() => {
              this.dismissAlert('alertExpense');
            }, 5000);
          }
        );
    }
  }

  clearComponent() {
    Object.keys(this.expenseForm.controls).forEach((key) => {
      const control = this.expenseForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });

    this.expenseForm.setValue({
      title: '',
      amount: null,
      isRecurrent: false,
      every: '',
      date: null,
      paidIt: false,
    });
  }

  get findEveryName() {
    return this.everyList.find((every) => every.id === this.expenseForm.value.every).name
  }

  get iHaveExpenseTextColor() {
    return this.expenseForm.value.paidIt ? 'text-primary-500' : 'text-warn-500';
  }

  get iHaveExpenseColor() {
    return this.expenseForm.value.paidIt ? 'primary' : 'warn';
  }

  get iHaveExpenseMessage() {
    if (this.expenseForm.invalid) return '';

    return this.expenseForm.value.paidIt && this.expenseForm.valid ? 'I already have this expense' : 'I do not have the expense yet';
  }

  dismissAlert(name: string): void {
    this._fuseAlertService.dismiss(name);
  }

  showAlert(name: string): void {
    this._fuseAlertService.show(name);
  }
}
