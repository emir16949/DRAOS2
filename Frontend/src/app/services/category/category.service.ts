import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public API = '//localhost:8080';
  public CATEGORY_API = this.API + '/category';
  result: Array<Object>;

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get(this.CATEGORY_API + '/all');
  }

  editCategory(category: Category): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.put(this.CATEGORY_API, category, httpOptions);
  }

  deleteCategory(category: Category): void {
    this.http.delete(this.CATEGORY_API + '/delete/' + category.id);
  }
}
