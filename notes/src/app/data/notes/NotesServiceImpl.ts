import { HttpClient } from "@angular/common/http";
import { Note } from "../models/Note";
import { Injectable } from "@angular/core";
import { NotesService } from "./NotesService";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../auth/FirebaseConfig";
import { Observable } from "rxjs";
import { Failure, Loading, Resource, Success } from "../Resource";
import { getAuth } from "firebase/auth";
import { ResponseUtil } from "src/app/utils/ResponseUtil";


export const headers = { 'Content-Type': 'application/json' };

@Injectable({
    providedIn: 'root'
})
export class NotesServiceImpl implements NotesService {
    auth = getAuth()
    init = initializeApp(FirebaseConfig)
    db = getFirestore(this.init)
    notesRef = collection(this.db, "notes");
    constructor(private httpClient: HttpClient) { }
    addNote(note: Note) {
        return new Observable<Resource<void>>((observer) => {
            observer.next(new Loading())
            addDoc(collection(this.db, "notes", `${this.auth.currentUser?.uid}`, "collect"), note)
                .then((document) => {
                    observer.next(new Success());
                })
                .catch((error) => {
                    observer.next(new Failure(error.errorMessage))
                })


        })
    }

    deleteNote(id: string) {
        return new Observable<Resource<void>>((observer) => {
            observer.next(new Loading())
            deleteDoc(doc(this.db, "notes", `${this.auth.currentUser?.uid}`, "collect", id))
                .then(() => {
                    observer.next(new Success())
                })
                .catch((error) => {
                    observer.next(new Failure(error.errorMessage()))
                })
        })
    }

    getAllNotes() {
        return new Observable<Resource<Note[]>>((observer) => {
            observer.next(new Loading())
            getDocs(collection(this.db, "notes", `${this.auth.currentUser?.uid}`, "collect"))
                .then((document) => {
                    let notes: Note[] = []
                    document.forEach((item) => {
                        let note: Note = ResponseUtil.toNote(item)
                        notes.push(note)
                    })
                    observer.next(new Success(notes))
                })
                .catch((error) => {
                    observer.next(new Failure(error.errorMessage()))
                })
        });
    }
}