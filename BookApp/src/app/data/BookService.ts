import { Observable } from "rxjs";
import { Book } from "./models/Book";
import { Resource } from "./models/Resource";

export abstract class BookService {
    abstract addBook(book: Book): Observable<Resource<Object>>
    abstract getBooks(): Observable<Resource<Book[]>>
}