import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SafeUser } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    const url = `${environment.URI}/api/user/register`;

    return this.http.post(url, user).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getAgentById(agentId: string): Observable<SafeUser> {
    const url = `${environment.URI}/api/user/agent/${agentId}`;

    return this.http.get(url).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  contactAgent(from: string, message: string) {
    const url = `${environment.URI}/api/user/contact`;

    return this.http.post(url, { from, message }).pipe(
      map((resp: any) => resp),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
