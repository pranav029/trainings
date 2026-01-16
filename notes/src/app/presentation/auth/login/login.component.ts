import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY_FIELD_MESSAGE, ERROR_MESSAGE, INVALID_EMAIL, MIN_PASSWORD_LENGTH, SHORT_PASSWORD_MESSAGE } from 'src/app/constants/Constants';
import { Failure, Loading, Success } from 'src/app/data/Resource';
import { AuthService } from 'src/app/data/auth/AuthService';
import { NotesAuth } from 'src/app/data/models/Credential';
import { CommonUtils } from 'src/app/utils/CommonUtils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage = ''
  isSignInProgress = false
  hide = true
  credential: NotesAuth.Credential = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSignInClick() {
    this.initiateSign()
  }

  private navigateToHome() {
    this.router.navigate(['/home'])
  }

  private initiateSign() {
    this.authService.signIn(this.credential).subscribe((resource) => {
      if (resource instanceof Loading)
        this.isSignInProgress = true;

      if (resource instanceof Success) {
        this.isSignInProgress = false;
        this.errorMessage = "";
        this.navigateToHome()
      }

      if (resource instanceof Failure) {
        this.isSignInProgress = false
        this.errorMessage = resource.message
      }
    })
  }

  getEmailError() {
    if (this.credential.email.length < 1) return EMPTY_FIELD_MESSAGE;
    if (!CommonUtils.isValidEmail(this.credential.email)) return INVALID_EMAIL;
    return ERROR_MESSAGE;
  }

  shouldShowEmailError() {
    if (this.credential.email.length < 1) return true;
    if (!CommonUtils.isValidEmail(this.credential.email)) return true;
    return false;
  }

  getPasswordError() {
    if (this.credential.password.length < 1) return EMPTY_FIELD_MESSAGE;
    if (this.credential.password.length < MIN_PASSWORD_LENGTH) return SHORT_PASSWORD_MESSAGE;
    return ERROR_MESSAGE;
  }

  shouldShowPasswordError() {
    if (this.credential.password.length < 1) return true;
    if (this.credential.password.length < MIN_PASSWORD_LENGTH) return true;
    return false;
  }
}
