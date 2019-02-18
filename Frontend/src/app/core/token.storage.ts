import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USER_KEY = 'currentUser';

@Injectable()
export class TokenStorage {

  constructor() { }

  static logOut() {
    localStorage.clear();
  }

  static saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  static getCurrentUser(): string {
    return localStorage.getItem(USER_KEY);
  }

  static saveCurrentUser(user: string): void {
    localStorage.setItem(USER_KEY, user);
  }
}
