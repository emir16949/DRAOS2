import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public API = '//192.168.99.100:8080';
  public CITY_API = this.API + '/city';

  result: Array<Object>;

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<any> {
    return this.http.get(this.CITY_API + '/all');
  }
}
