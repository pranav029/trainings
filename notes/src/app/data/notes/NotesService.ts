import { Observable } from "rxjs";
import { Note } from "../models/Note";
import { Resource } from "../Resource";

export abstract class NotesService {
    abstract addNote(note: Note): Observable<Resource<void>>;
    abstract deleteNote(id: string): Observable<Resource<void>>;
    abstract getAllNotes(): Observable<Resource<Note[]>>;
}