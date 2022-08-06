import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'app/core/account/account.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  formFieldHelpers: string[] = [''];

  incomeForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', []),
    date: new FormControl(null, [Validators.required]),
    gotIt: new FormControl(false, []),
  });

  expenseForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(18)]),
    amount: new FormControl(null, [Validators.required]),
    isRecurrent: new FormControl(false, [Validators.required]),
    every: new FormControl('', [Validators.required]),
    date: new FormControl(null, [Validators.required]),
    paidIt: new FormControl(false, [Validators.required]),
  });

  everyList = [
    {id: '1', name: 'Day of selected'},
    {id: '2', name: 'Week'},
    {id: '3', name: 'Weekly'},
    {id: '4', name: 'Month'},
  ]

  constructor(
    private _accountService: AccountService,
    private _userService: UserService,
    ) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount() {
    this._userService.user$
    .subscribe((user: User) => {
      this._accountService.getAccountInfo(Number(user.id)).subscribe(
        (response) => {
          if(response.propertyIsEnumerable('data')){
            console.log(response);
          }
        }
      );
    });
  }

  get findEveryName(){
    return this.everyList.find((every) => every.id === this.incomeForm.value.every).name
  }
}
