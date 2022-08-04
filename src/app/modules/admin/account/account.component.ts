import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/account/account.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private _accountService: AccountService,
    private _userService: UserService,
    ) { }

  ngOnInit(): void {
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
