import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/account/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(
    private _accountService: AccountService,
    ) { }

  ngOnInit(): void {
    this._accountService.getAccountInfo().subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
