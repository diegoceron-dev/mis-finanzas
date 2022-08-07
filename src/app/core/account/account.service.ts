import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from '../persistence/localstorage.service';

export interface IncomeInterface {
  title: string;
  amount: number;
  gotIt: boolean;
  date: string;
  account: number;
}

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(
        private _httpClient: HttpClient,
        private _localStorage: LocalstorageService,
    ) {}


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createAccount(user: number): Observable<any>
    {
        const account = {
          accountId: Math.random().toString().substring(2, 10),
          typeAccount: 'classic',
          user: user,
          expenses: [],
          incomes: []
        };

        const auth_token = 'ba2504d0a29c99a8ee584a8dfdcaee74b4db19d2c39cfa0fb0e68ae58f7601323378b0a20a77f5b4d08df8a4b79717f8fa4138b61680ecf4d36f9173be7d44d51d8ac82d691ff4d2716cb64733bf6f21117bc3e195af371e28a9aaadf53aedaea88f4f317769c80fe8706818b6d4ee48350bfe0c50883c0e61ad492ef3577957';
        
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth_token}`
          });
        
        const data = {
          data: account
        }

        return this._httpClient.post('http://localhost:1337/api/accounts?', data, { headers });
    }

    getAccountInfo(user: number): any {
      const auth_token = this._localStorage.accessToken;
        
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });

      return this._httpClient.get(`http://localhost:1337/api/accounts?populate[user][filters][id][$eq]=${user}`, { headers });
    }

    saveIncome(income: IncomeInterface) {
      const auth_token = this._localStorage.accessToken;
        
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      });

      const data = {
        data: income
      }
      
      return this._httpClient.post('http://localhost:1337/api/incomes', data, { headers });
    }

}
