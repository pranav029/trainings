import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NotesServiceImpl } from './notes/NotesServiceImpl';
import { NotesService } from './notes/NotesService'
import { AuthService } from './auth/AuthService';
import { AuthServiceImpl } from './auth/AuthServiceImpl';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: NotesService, useExisting: NotesServiceImpl },
    { provide: AuthService, useClass: AuthServiceImpl }
  ]
})
export class DataModule { }
