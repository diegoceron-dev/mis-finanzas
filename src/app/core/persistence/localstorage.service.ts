import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalstorageService {
    constructor() {}

    /* AccessToken */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    /* Account */
    set account(account: string) {
        localStorage.setItem('account', account);
    }

    get account(): string {
        return localStorage.getItem('account') ?? '';
    }
}
