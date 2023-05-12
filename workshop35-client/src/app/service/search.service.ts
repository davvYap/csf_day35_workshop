import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book, Details } from '../models';
import { Observable, Subject, filter, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  booksOnRequest = new Subject<Book[]>();

  constructor(private http: HttpClient) {}

  searchBookByJson(bookDetails: Details): Observable<Book[]> {
    if (bookDetails.title === '') {
      this.booksOnRequest.next([]);
      return new Observable();
    }

    return this.http
      .post<Book[]>('http://localhost:8080/api/books', bookDetails)
      .pipe(
        tap((b) => this.booksOnRequest.next(b)),
        map((b) => b)
      );
  }
}
