import { Component, OnInit } from '@angular/core';

import { initializeApp } from "firebase/app";
import { FirebaseConfig } from './data/auth/FirebaseConfig';
import { Session } from './data/session/Session';
import { Router } from '@angular/router';
import { AuthService } from './data/auth/AuthService';
import { AuthServiceImpl } from './data/auth/AuthServiceImpl';
import { Failure, Success } from './data/Resource';
import { DIALOG_POSITIVE_RESPONSE, SIGN_OUT_CONFIRMATION } from './constants/Constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './presentation/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, Session.Listener {
  private sessionManager!: Session.SessionManager;
  private authService!: AuthService
  isSyncInProgress = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeFirebase()
    this.authService = new AuthServiceImpl();
    this.sessionManager = new Session.SessionManager(this);
    this.sessionManager.initSession();
  }

  onSyncStart(): void {
    this.isSyncInProgress = true;
  }
  onSyncComplete(): void {
    this.isSyncInProgress = false;
    this.navigateToHome();
  }

  private initializeFirebase() {
    initializeApp(FirebaseConfig);
  }

  private navigateToHome() {
    this.router.navigate(['']);
  }

  private navigateToLogin() {
    this.router.navigate(['/login']);
  }

  private signOut() {
    this.authService.signOut().subscribe((resource) => {
      if (resource instanceof Success || resource instanceof Failure) {
        this.navigateToLogin();
      }
    })
  }

  shouldShowSignOutIcon() {
    return this.authService.isUserLoggedIn();
  }

  onSignOutClick() {
    this.confirmSignOut();
  }

  private getConfirmationMessage() {
    return SIGN_OUT_CONFIRMATION;
  }

  private isDialogResponsePositve(result: string): Boolean {
    return result == DIALOG_POSITIVE_RESPONSE
  }

  private confirmSignOut() {
    let ref = this.matDialog.open(ConfirmationDialogComponent, {
      data: this.getConfirmationMessage()
    })
    ref.afterClosed().subscribe((result) => {
      if (this.isDialogResponsePositve(result))
        this.signOut();
    });
  }
}


