import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful:', response);

          // Check if the response contains a token
          if (response.token) {
            // Store the JWT token in a cookie
            this.cookieService.set(
              'authToken',
              response.token,
              1,
              '/',
              '',
              true,
              'Strict'
            );
          }

          // Redirect after successful login
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login error:', error);

          if (error.status === 400) {
            alert('Invalid credentials, please try again.');
          } else if (error.status === 500) {
            alert('Server error, please try again later.');
          } else {
            alert('An error occurred, please try again.');
          }
        }
      );
    }
  }
}
