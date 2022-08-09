import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FuseAlertService } from '@fuse/components/alert';
import { AccountService } from 'app/core/account/account.service';
import { LocalstorageService } from 'app/core/persistence/localstorage.service';
import { trimStart } from 'lodash';
import moment, { months } from 'moment';

@Component({
  selector: 'form-income',
  templateUrl: './form-income.component.html',
  styleUrls: ['./form-income.component.scss'],
})
export class FormIncomeComponent implements OnInit {
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalstorageService,
    private _fuseAlertService: FuseAlertService
  ) {
  }

  incomeForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(18),
    ]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', []),
    date: new FormControl(null, [Validators.required]),
    gotIt: new FormControl(false, []),
  });

  everyList = [
    { id: '1', name: 'Day of selected' },
    { id: '2', name: 'Week' },
    { id: '3', name: 'Weekly' },
    { id: '4', name: 'Month' },
  ];

  alert = {
    title: '',
    message: '',
    type: 'primary'
  }

  ngOnInit(): void { }

  changeIsCurrentIncome(event: Event) {
    if (!this.incomeForm.value.isRecurrent) {
      this.incomeForm.patchValue({ every: '' });
    }
  }

  submitForm() {
    console.log('Save Income');
    if (this.incomeForm.valid) {
      this._accountService
        .saveIncome({
          title: this.incomeForm.value.title,
          amount: this.incomeForm.value.amount,
          gotIt: this.incomeForm.value.gotIt,
          date: this.incomeForm.value.date?._i,
          account: Number(this._localStorage.account),
        })
        .subscribe(
          res => {
            console.log(res);
            this.clearComponent();
            this.alert.message = 'The income has been saved successfully';
            this.alert.title = 'Successful operation';
            this.alert.type = 'primary'
            this.showAlert('alertIncome');
          },
          err => {
            console.log(err);
            this.alert.message = err.message;
            this.alert.title = 'Error operation';
            this.alert.type = 'error'
            this.showAlert('alertIncome');
          },
          () => {
            setTimeout(() => {
              this.dismissAlert('alertIncome');
            }, 5000);
          }
        );
    }
  }

  clearComponent() {
    Object.keys(this.incomeForm.controls).forEach((key) => {
      const control = this.incomeForm.controls[key];
      control.markAsPristine();
      control.markAsUntouched();
      control.setErrors(null);
    });

    this.incomeForm.setValue({
      title: '',
      amount: null,
      isRecurrent: false,
      every: '',
      date: null,
      gotIt: false,
    });
  }


  get findEveryName() {
    return this.everyList.find(
      (every) => every.id === this.incomeForm.value.every
    ).name;
  }

  get iHaveIncomeTextColor() {
    return this.incomeForm.value.gotIt
      ? 'text-primary-500'
      : 'text-warn-500';
  }

  get iHaveIncomeColor() {
    return this.incomeForm.value.gotIt ? 'primary' : 'warn';
  }

  get iHaveIncomeMessage() {
    if (this.incomeForm.invalid) return '';

    return this.incomeForm.value.gotIt && this.incomeForm.valid
      ? 'I already have this income'
      : 'I do not have the income yet';
  }

  dismissAlert(name: string): void {
    this._fuseAlertService.dismiss(name);
  }

  showAlert(name: string): void {
    this._fuseAlertService.show(name);
  }
}
