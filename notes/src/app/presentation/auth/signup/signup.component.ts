import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY_FIELD_MESSAGE, ERROR_MESSAGE, INVALID_EMAIL, MIN_PASSWORD_LENGTH, PASSWORD_NOT_MATCH, SHORT_PASSWORD_MESSAGE } from 'src/app/constants/Constants';
import { Failure, Loading, Success } from 'src/app/data/Resource';
import { AuthService } from 'src/app/data/auth/AuthService';
import { NotesAuth } from 'src/app/data/models/Credential';
import { CommonUtils } from 'src/app/utils/CommonUtils';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  hide = true
  errorMessage = ''
  credential: NotesAuth.Credential = {
    email: '',
    password: ''
  }
  confirmPassword = ''
  isSignUpInProgress = false

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  getConfirmPasswordError() {
    if (this.confirmPassword.length < 1) return EMPTY_FIELD_MESSAGE;
    if (this.confirmPassword != this.credential.password) return PASSWORD_NOT_MATCH;
    if (this.confirmPassword.length < MIN_PASSWORD_LENGTH) return SHORT_PASSWORD_MESSAGE;
    return ERROR_MESSAGE;
  }

  getEmailErrorMessage() {
    if (this.credential.email.length < 1) return EMPTY_FIELD_MESSAGE;
    if (!CommonUtils.isValidEmail(this.credential.email)) return INVALID_EMAIL;
    return ERROR_MESSAGE;
  }

  shouldEnableButton(): boolean {
    if (this.confirmPassword.length < 1) return false;
    if (this.confirmPassword != this.credential.password) return false;
    if (this.credential.email.length < 1) return false;
    return true;
  }

  shouldDisplayEmailError() {
    if (this.credential.email.length < 1) return true;
    if (!CommonUtils.isValidEmail(this.credential.email)) return true;
    return false;
  }

  shouldDisplayConfirmPasswordError() {
    if (this.confirmPassword.length < 1) return true;
    if (this.confirmPassword != this.credential.password) return true;
    if (this.confirmPassword.length < MIN_PASSWORD_LENGTH) return true;
    return false;
  }

  onSubmit() {
    if (this.shouldDisplayConfirmPasswordError() || this.shouldDisplayEmailError()) return;
    this.initiateAccountCreation();
  }

  private initiateAccountCreation() {
    this.authService.signUp(this.credential).subscribe((resource) => {
      if (resource instanceof Loading) this.isSignUpInProgress = true;
      if (resource instanceof Success) {
        this.isSignUpInProgress = false;
        this.navigateToHome()
      }
      if (resource instanceof Failure) {
        this.isSignUpInProgress = false;
        this.errorMessage = resource.message
      }
    })
  }

  private navigateToHome() {
    this.router.navigate(['/home']);
  }
}
