import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteCardComponent } from './note-card/note-card.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { DataModule } from '../data/data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog'
import { NotesService } from '../data/notes/NotesService';
import { NotesServiceImpl } from '../data/notes/NotesServiceImpl';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatListModule } from '@angular/material/list'
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component'
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatInputModule } from '@angular/material/input'




@NgModule({
  declarations: [
    NoteCardComponent,
    CreateComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DataModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ],
  providers: [{ provide: NotesService, useExisting: NotesServiceImpl }]
})
export class PresentationModule { }
