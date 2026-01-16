import { Observable } from "rxjs";
import { BookService } from "./BookService";
import { Book } from "./models/Book";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseUtil } from "../utils/ResponseUtil";
import { Resource } from "./models/Resource";

const BASE_URL = "http://localhost:3000/books"

@Injectable({
    providedIn: 'root'
})
export class BookServiceImpl implements BookService {

    constructor(private httpClient: HttpClient) { }

    addBook(book: Book): Observable<Resource<Object>> {
        return ResponseUtil.handleExceptions(this.httpClient.post(BASE_URL, book))
    }

    getBooks(): Observable<Resource<Book[]>> {
        return ResponseUtil.handleExceptions(this.httpClient.get<Book[]>(BASE_URL))
    }

}