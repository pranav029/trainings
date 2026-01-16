import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTES_SNACKBAR_DURATION, NO_RECORDS, SAVE_SUCCESS } from 'src/app/constants/Constants';
import { BookService } from 'src/app/data/BookService';
import { Book } from 'src/app/data/models/Book';
import { Failure, Loading, Success } from 'src/app/data/models/Resource';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  erroMessage = ''
  isLoadInProgress = false
  isSaveInProgress = false
  isButtonVisible = true
  books: Book[] = []
  formBook: Book = {
    bName: '',
    aName: '',
    pYear: '',
    language: ''
  }
  constructor(
    private bookService: BookService,
    private snackbar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.fetchBooks();
  }

  onSave() {
    this.bookService.addBook(this.formBook).subscribe((resource) => {
      if (resource instanceof Loading)
        this.isSaveInProgress = true
      if (resource instanceof Success) {
        setTimeout(() => {
          this.isSaveInProgress = false;
        }, 2000)
        this.showSaveSuccess()
        this.fetchBooks()
        this.reset()
      }
      if (resource instanceof Failure) {
        this.isSaveInProgress = false;
        this.reset();
        this.erroMessage = resource.message
      }
    })
  }

  private fetchBooks() {
    this.isButtonVisible = true
    this.bookService.getBooks().subscribe((resource) => {
      if (resource instanceof Loading) {
        this.isLoadInProgress = true
      }
      if (resource instanceof Success) {
        this.books = resource.data
        this.setErrorMessage()
        this.isLoadInProgress = false
      }
      if (resource instanceof Failure) {
        this.erroMessage = resource.message;
        this.setErrorMessage();
        this.isLoadInProgress = false;
      }
    })
  }

  private showSaveSuccess() {
    this.snackbar.open(SAVE_SUCCESS, "", {
      duration: NOTES_SNACKBAR_DURATION
    });
  }

  private reset() {
    this.formBook = {
      aName: '',
      pYear: '',
      language: '',
      bName: ''
    }
  }

  onAddClick() {
    this.isButtonVisible = false;
  }

  onCloseClick() {
    this.reset()
    this.isButtonVisible = true;
  }

  displayedColumns: string[] = ['position', 'name', 'author', 'year', 'language'];

  setErrorMessage() {
    if (this.erroMessage.length > 0) return;
    if (this.books.length == 0) {
      this.erroMessage = NO_RECORDS;
      return;
    }
    this.erroMessage = ''
  }
}
