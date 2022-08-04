import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Route, RouterModule } from '@angular/router';

const accountRoutes: Route[] = [
  {
      path     : '',
      component: AccountComponent
  }
];

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(accountRoutes)
  ]
})
export class AccountModule { }
