import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Store token in a cookie
        this.cookieService.set(
          'authToken',
          response.token,
          1,
          '/',
          '',
          true,
          'Strict'
        ); // Secure cookie with HttpOnly flag
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  // Save token to localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Check if the token exists in localStorage
  isLoggedIn(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists, otherwise false
  }

  // Optionally: Method to remove token on logout
  logout(): void {
    // Remove the auth token cookie
    this.cookieService.delete('authToken', '/');
  }

  // Check if token exists
  isAuthenticated(): boolean {
    return this.cookieService.check('authToken'); // Check if the token cookie exists
  }

  // Get the token value
  getToken(): string | null {
    return this.cookieService.get('authToken'); // Retrieve token from the cookie
  }
}
