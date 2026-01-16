import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/data/models/Note';
import { NotesService } from 'src/app/data/notes/NotesService';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DELETE_CONFIRMATION_MESSAGE, DELETE_SUCCESS, DIALOG_POSITIVE_RESPONSE, NOTES_SNACKBAR_DURATION } from 'src/app/constants/Constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Failure, Loading, Success } from 'src/app/data/Resource';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent {
  @Input() note: Note = {
    title: '',
    description: ''
  }

  isDeleteInProgress = false
  @Output() refreshEvent = new EventEmitter();

  constructor(
    private noteService: NotesService,
    private matDialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  onDeleteClick() {
    this.confirmDelete()
  }

  private delete() {
    if (this.note.id) {
      this.noteService.deleteNote(this.note.id).subscribe((resource) => {
        if (resource instanceof Loading)
          this.isDeleteInProgress = true;
        if (resource instanceof Success) {
          this.isDeleteInProgress = false;
          this.showDeleteSuccess();
          this.refreshEvent.emit(true)
        }
        if (resource instanceof Failure) {
          this.isDeleteInProgress = false;
          this.showDeleteFailure(resource.message);
          this.refreshEvent.emit(true)
        }

      })
    }

  }

  private confirmDelete() {

    let ref = this.matDialog.open(ConfirmationDialogComponent, {
      data: this.getConfirmationMessage()
    });

    ref.afterClosed().subscribe((result) => {
      if (this.isDialogResponsePositve(result))
        this.delete();
    });
  }

  private getConfirmationMessage(): string {
    return DELETE_CONFIRMATION_MESSAGE.replace("%s", this.note.title)
  }

  private isDialogResponsePositve(result: string): Boolean {
    return result == DIALOG_POSITIVE_RESPONSE;
  }

  private showDeleteSuccess() {
    this.snackbar.open(DELETE_SUCCESS, "", {
      duration: NOTES_SNACKBAR_DURATION
    });
  }

  private showDeleteFailure(error: string) {
    this.snackbar.open(error, "", {
      duration: NOTES_SNACKBAR_DURATION
    });
  }
}
