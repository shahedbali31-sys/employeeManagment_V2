import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

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
  isSignUp = false;

  isForgotPassword = false;
  resetUsername = '';
  newPassword = '';

  showSignUpConfirm = false;
  showResetConfirm = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  @HostListener('document:keydown.enter')
  handleEnter() {
    if (this.showSignUpConfirm) {
      this.signUp();
    } else if (this.showResetConfirm) {
      this.resetPassword();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleMode() {
    this.isSignUp = !this.isSignUp;
    this.errorMessage = '';
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

  askSignUpConfirm() {
    const u = this.username.trim();
    const p = this.password.trim();

    if (!u || !p) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.errorMessage = '';
    this.showSignUpConfirm = true;
  }

  signUp() {
    if (!this.showSignUpConfirm) return;
    this.showSignUpConfirm = false;
    const u = this.username.trim();
    const p = this.password.trim();

    this.userService.register(u, p).subscribe({
      next: () => {
        this.toastr.success('Account created successfully!', 'Success');
        this.username = '';
        this.password = '';
        this.errorMessage = '';
        this.isSignUp = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error creating account';
      }
    });
  }

  goToForgotPassword() {
    this.isForgotPassword = true;
    this.errorMessage = '';
  }

  backToLogin() {
    this.isForgotPassword = false;
    this.errorMessage = '';
    this.resetUsername = '';
    this.newPassword = '';
  }

  askResetConfirm() {
    const u = this.resetUsername.trim();
    const p = this.newPassword.trim();

    if (!u || !p) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.errorMessage = '';
    this.showResetConfirm = true;
  }

  resetPassword() {
    if (!this.showResetConfirm) return;
    this.showResetConfirm = false;
    const u = this.resetUsername.trim();
    const p = this.newPassword.trim();

    this.userService.resetPassword(u, p).subscribe({
      next: () => {
        this.toastr.success('Password updated successfully!', 'Success');
        this.resetUsername = '';
        this.newPassword = '';
        this.errorMessage = '';
        this.isForgotPassword = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Username not found';
      }
    });
  }
}