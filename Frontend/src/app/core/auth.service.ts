import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { TokenStorage } from './token.storage';

@Injectable()
export class AuthService {

  TOKEN_API_URL = 'http://192.168.99.100:8080/token/generate-token';

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {
  }

  static logOut() {
    TokenStorage.logOut();
  }

  static getToken(): string {
    return TokenStorage.getToken();
  }

  static getCurrentUser(): string {
    return TokenStorage.getCurrentUser();
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = { username: username, password: password };
    return this.http.post<any>(this.TOKEN_API_URL, credentials);
  }

  isLoggedIn(): boolean {

    const token = AuthService.getToken();

    if (token == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken(): any {
    return this.jwtHelper.decodeToken(AuthService.getToken());
  }

  getUserRole(): string {
    if (!this.isLoggedIn()) {
      return 'NONE';
    }
    const decodedToken = this.getDecodedToken();
    return decodedToken.role.authority;
  }

  getUserName(): string {
    const decodedToken = this.getDecodedToken();
    return decodedToken.sub;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'ROLE_ADMIN';
  }

  isUser(): boolean {
    return this.getUserRole() === 'ROLE_USER';
  }
}


