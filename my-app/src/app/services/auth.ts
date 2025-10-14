// auth.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'   // ✅ ensures it is available app-wide
})
export class AuthService {

  
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  login(userName: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/login`, {
      params: { userName, password }
    }).pipe(
      tap((user: any) => {
        // store logged in user in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(user));
      })
    );
  }
  


  getLoggedInUserIdByJWT(): number | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;

    try {
      // Decode JWT payload
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.userId;  // Adjust field according to your token
    } catch (err) {
      console.error('Failed to parse JWT', err);
      return null;
    }
  }

  getLoggedInUserId(): number | null {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user).id : null;
  }
  
}
