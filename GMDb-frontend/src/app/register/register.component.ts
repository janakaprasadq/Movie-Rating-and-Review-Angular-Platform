import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check that the password and confirm password fields match
  passwordMatchValidator(formGroup: FormGroup): null | object {
    return formGroup.get('password')?.value ===
      formGroup.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;

      console.log('Form data:', this.registerForm.value);

      // Call the register function from the AuthService
      this.authService.register(email, password).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          // Store the JWT token if it's in the response
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
          // Redirect to login page after successful registration
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration error:', error);
          if (error.status === 400) {
            alert('Invalid email or password.');
          } else if (error.status === 500) {
            alert('Server error, please try again later.');
          } else {
            alert('Registration failed, please try again.');
          }
        }
      );
    }
  }
}
