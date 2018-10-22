import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  public API = '//localhost:8080';
  public COMMENT_API = this.API + '/comment';
  result: Array<Object>;

  constructor(private http: HttpClient) { }

  getCommentsForEvent(id: number): Observable<any> {
    return this.http.get(this.COMMENT_API + '/' + id);
  }

  createComment(comment: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<Comment>(this.COMMENT_API + "/create", comment, httpOptions);
  }


}
