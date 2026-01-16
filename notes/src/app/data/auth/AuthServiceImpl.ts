import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import { AuthService } from "./AuthService";
import { Observable } from "rxjs";
import { Resource, Loading, Success, Failure } from "../Resource";
import { Injectable } from "@angular/core";
import { NotesAuth } from "../models/Credential";

@Injectable({
    providedIn: 'root'
})
export class AuthServiceImpl extends AuthService {
    auth = getAuth()

    override signUp(credential: NotesAuth.Credential): Observable<Resource<void>> {
        return new Observable((observer) => {
            observer.next(new Loading())
            setPersistence(this.auth, browserSessionPersistence)
                .then(() => {
                    return createUserWithEmailAndPassword(this.auth, credential.email, credential.password)
                        .then((userCredential) => {
                            observer.next(new Success())
                        })
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    observer.next(new Failure(errorMessage));
                });
        });
    }

    override isUserLoggedIn(): boolean {
        return this.auth.currentUser != null
    }

    override signIn(credential: NotesAuth.Credential): Observable<Resource<void>> {
        return new Observable((observer) => {
            observer.next(new Loading())
            signInWithEmailAndPassword(this.auth, credential.email, credential.password)
                .then((userCredential) => {
                    observer.next(new Success())
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    observer.next(new Failure(errorMessage))
                });
        })
    }

    override signOut(): Observable<Resource<void>> {
        return new Observable((observer) => {
            observer.next(new Loading())
            this.auth.signOut()
                .then(() => {
                    observer.next(new Success())
                })
                .catch((error) => {
                    observer.next(new Failure(error.errorMessage))
                })
        })
    }

}