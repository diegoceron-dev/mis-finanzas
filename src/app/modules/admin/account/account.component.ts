import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  
  public amountIncome: number = 128;

  public amountExpense: number = 126;

  incomeForm = new FormGroup({
    title: new FormControl(''),
    amount: new FormControl(null),
    gotIt: new FormControl(false),
    date: new FormControl()
  });

  expenseForm = new FormGroup({
    title: new FormControl(''),
    amount: new FormControl(null),
    paidIt: new FormControl(false),
    date: new FormControl()
  });  

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
}
