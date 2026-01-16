import { Observable, catchError, throwError } from "rxjs";
import { Failure, Loading, Resource, Success } from "../data/models/Resource";

export namespace ResponseUtil {
    export function handleExceptions<T>(response: Observable<T>): Observable<Resource<T>> {
        return new Observable((observer) => {
            observer.next(new Loading());
            response
                .pipe(
                    catchError(error => {
                        observer.next(new Failure(error.message))
                        return throwError(()=>error)
                    })
                )
                .subscribe((item) => observer.next(new Success(item)))
        })
    }
}