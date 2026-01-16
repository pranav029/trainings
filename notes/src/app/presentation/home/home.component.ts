import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Failure, Loading, Success } from 'src/app/data/Resource';
import { Note } from 'src/app/data/models/Note';
import { NotesService } from 'src/app/data/notes/NotesService';
import { NotesServiceImpl } from 'src/app/data/notes/NotesServiceImpl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  isFetchInProgress = false;
  errorMessage = ''

  isAddNoteVisible: Boolean = true;

  constructor(private noteService: NotesService) { }

  ngOnInit(): void {
    this.fetch()
  }

  private fetch() {
    this.noteService.getAllNotes().subscribe((resource) => {
      if (resource instanceof Loading)
        this.isFetchInProgress = true;
      if (resource instanceof Success) {
        this.notes = resource.data
        this.isFetchInProgress = false;
        this.errorMessage = ''
      }
      if (resource instanceof Failure) {
        this.isFetchInProgress = false;
        this.errorMessage = resource.message
      }
    });
  }

  refresh(buttonState: Boolean) {
    this.isAddNoteVisible = true;
    this.fetch()
  }

  hideCreateNote() {
    this.isAddNoteVisible = false;
  }
}
