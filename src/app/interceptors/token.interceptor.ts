import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AUTHORIZATION_HEADER_KEY = 'Authorization';
export const AUTHORIZATION_HEADER_PREFIX = 'Bearer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const cloudinaryApi =
      'https://api.cloudinary.com/v1_1/devmexsoft/image/upload';

    if (this.authService.getAccessToken() && request.url !== cloudinaryApi) {
      return next
        .handle(
          request.clone({
            headers: request.headers.set(
              AUTHORIZATION_HEADER_KEY,
              `${AUTHORIZATION_HEADER_PREFIX} ${this.authService.getAccessToken()}`
            ),
          })
        )
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === HttpStatusCode.Unauthorized) {
              this.authService.logout();
            }
            return throwError(() => err);
          })
        );
    }

    return next.handle(request);
  }
}

export const TOKEN_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
