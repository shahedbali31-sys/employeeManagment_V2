import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  isSignUp = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
    this.successMessage = '';
    this.username = '';
    this.password = '';
  }

  login() {
    const u = this.username.trim();
    const p = this.password.trim();

    if (!u || !p) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.userService.login(u, p).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }

  signUp() {
    const u = this.username.trim();
    const p = this.password.trim();

    if (!u || !p) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.userService.register(u, p).subscribe({
      next: () => {
        this.successMessage = 'Account created! You can login now.';
        this.errorMessage = '';
        setTimeout(() => {
          this.toggleMode();
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error creating account';
      }
    });
  }
}