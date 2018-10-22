import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenStorage } from './token.storage';
import { tap } from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private tokenService: TokenStorage, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (TokenStorage.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + TokenStorage.getToken()) });
    }

    return next.handle(authReq)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {

            if (event instanceof HttpErrorResponse) {
              console.log(event);
              console.log('req url :: ' + req.url);

              if (event.status === 401) {
                this.router.navigate(['login']);
              }
            }
          }
        )
      );
  }

}
