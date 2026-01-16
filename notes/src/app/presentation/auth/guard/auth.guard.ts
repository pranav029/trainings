import { Component, inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/data/auth/AuthService';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

export const AuthGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isUserLoggedIn()) return true;
  inject(Router).navigate(['/login']);
  return false;
};

export const DeactivateLogin: CanDeactivateFn<LoginComponent> = (component: LoginComponent) => inject(AuthService).isUserLoggedIn()
export const DeactivateSignUp: CanDeactivateFn<SignupComponent> = (component: SignupComponent) => inject(AuthService).isUserLoggedIn()
