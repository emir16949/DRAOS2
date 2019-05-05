import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public API = '//192.168.99.100:8080';
  public EVENT_API = this.API + '/event';
  result: Array<Object>;

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(this.EVENT_API + '/all');
  }

  getEventsByCategory(category: string): Observable<any> {
    return this.http.get(this.EVENT_API + '/' + category);
  }

  getEvent(id: number): Observable<any> {
    return this.http.get(this.EVENT_API + '/id/' + id);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(this.EVENT_API + '/delete/' + id);
  }

  createEvent(event: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.post<Event>(this.EVENT_API, event, httpOptions);
  }

  changeEvent(event: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.put(this.EVENT_API, event, httpOptions);
  }

  getByName(name: string): Observable<any> {
    return this.http.get(this.EVENT_API + '/name/' + name);
  }

  getByNameOfPlace(name: string): Observable<any> {
    return this.http.get(this.API + '/place/name/' + name);
  }
}
