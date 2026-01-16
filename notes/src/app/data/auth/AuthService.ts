import { Observable } from "rxjs";
import { Resource } from "../Resource";
import { NotesAuth } from "../models/Credential";

export abstract class AuthService{
    abstract isUserLoggedIn():boolean
    abstract signIn(credential:NotesAuth.Credential):Observable<Resource<void>>
    abstract signUp(credential:NotesAuth.Credential):Observable<Resource<void>>
    abstract signOut():Observable<Resource<void>>
}