import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  showPassword = false;

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const u = this.username.trim();
    const p = this.password.trim();
    if (u === 'admin' && p === '123456') {
      this.router.navigate(['/employees']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}