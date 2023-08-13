import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { SafeUser } from '../types';
import { getStorage, removeStorage, setStorage } from '../helpers/storage';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export type AuthError = "WrongCredentials";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private user: SafeUser | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  userEmitter: EventEmitter<SafeUser | null> = new EventEmitter();
  authError: EventEmitter<AuthError> = new EventEmitter();

  setCurrentUser(user: SafeUser | null, tokens: Tokens | null) {
    if (user && tokens)
      setStorage([
        { key: 'user', value: user },
        { key: 'access_token', value: tokens?.access_token! },
        { key: 'refresh_token', value: tokens?.refresh_token! },
      ]);

    this.user = user;
    this.accessToken = tokens?.access_token || null;
    this.refreshToken = tokens?.refresh_token || null;
    this.userEmitter.emit(user);
  }

  loadStorageUser() {
    const [user, access_token, refresh_token] = getStorage([
      'user',
      'access_token',
      'refresh_token',
    ]);

    if (user && access_token && refresh_token)
      this.setCurrentUser(user, { access_token, refresh_token });
  }

  getCurrentUser(): SafeUser | null {
    return this.user;
  }

  login(email: string, password: string) {
    const url = `${environment.URI}/api/auth/login`;

    return this.http.post(url, { email, password }).pipe(
      map((resp: any) => {
        this.setCurrentUser(resp.user, {
          access_token: resp.tokens.access_token,
          refresh_token: resp.tokens.refresh_token,
        });
        return resp;
      }),
      catchError((err) => {
        this.authError.emit("WrongCredentials");
        return throwError(() => err);
      })
    );
  }

  loginGoogle(id: string) {
    const url = `${environment.URI}/api/auth/google/login`;
    const headers = new HttpHeaders({ Authorization: `Bearer ${id}` });
    return this.http.post(url, {}, { headers }).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  logout() {
    removeStorage(['user', 'access_token', 'refresh_token']);
    this.setCurrentUser(null, null);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
