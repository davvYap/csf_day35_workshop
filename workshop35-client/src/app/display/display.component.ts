import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { Observable } from 'rxjs';
import { Book } from '../models';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css'],
})
export class DisplayComponent implements OnInit {
  constructor(private searchService: SearchService) {}

  books$?: Observable<Book[]>;

  booksArray: Book[] = [];

  ngOnInit(): void {
    this.books$ = this.searchService.booksOnRequest;

    // to create array of books from observable
    this.books$.subscribe((books) => {
      this.booksArray = books;
    });
  }
}
