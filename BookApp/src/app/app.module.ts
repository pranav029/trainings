import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './presentation/header/header.component';
import { BookComponent } from './presentation/book/book.component';
import { HttpClientModule } from '@angular/common/http'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input';
import { BookService } from './data/BookService';
import { BookServiceImpl } from './data/BookServiceImpl';
import { FormsModule } from '@angular/forms'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [{ provide: BookService, useClass: BookServiceImpl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
