import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Grade } from './Grade'


@Injectable({
  providedIn: 'root'
})
export class GradeService {

  public API = '//localhost:8080';
  public GRADE_API = this.API + '/grade';
  result: Array<Object>;

  constructor(private http: HttpClient) { }

  getAverageGrade(id: number): Observable<any> {
    return this.http.get(this.GRADE_API + '/' + id);
  }

  createGrade(grade: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<Grade>(this.GRADE_API + "/create", grade, httpOptions);
  }

  updateGrade(grade: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put<Grade>(this.GRADE_API, grade, httpOptions);
  }

  getGradeByUserId(username: any, eventId: any): Observable<any> {
    return this.http.get(this.GRADE_API + "/user/" + username + "/event/" + eventId);
  }
}
