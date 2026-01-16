import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DataModule } from './data/data.module';
import { PresentationModule } from './presentation/presentation.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotesService } from './data/NotesService';
import { NotesServiceImpl } from './data/notes/NotesServiceImpl';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatToolbarModule, MatDialogModule, HttpClientModule,DataModule],
      declarations: [AppComponent],
      providers: [
        HttpClient,
        { provide: NotesService, useExisting: NotesServiceImpl },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'notes'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('notes');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.header')?.textContent).toContain('notes app is running!');
  // });
});
