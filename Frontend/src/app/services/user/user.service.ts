import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/User';
import { UserModel } from '../user/UserModel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public API = '//localhost:8080';
  public USER_API = this.API + '/user';

  constructor(private http: HttpClient) { }

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  createUser(user: User): Observable<any> {
    user.user_role.id = 2; // postavljanje user role da bude ROLE_USER
    return this.http.post<UserModel>(this.USER_API + '/create', user, httpOptions);
  }

  createUser1(user: UserModel): Observable<any> {
    user.user_role.id = 2; // postavljanje user role da bude ROLE_USER
    return this.http.post<UserModel>(this.USER_API + '/create', user, httpOptions);
  }

  updateUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put(this.USER_API, user, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.USER_API + '/all');
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(this.USER_API + '?id=' + id);
  }

  getByUsername(name: string): Observable<any> {
    return this.http.get(this.USER_API + '/username/' + name);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete(this.USER_API + '/delete/' + id);
  }

  getUserByUsername(username: any): Observable<any> {
    return this.http.get(this.USER_API + '/username/' + username);

  }
}
