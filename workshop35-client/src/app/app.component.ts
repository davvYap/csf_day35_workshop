import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from './service/search.service';
import { Book, Details } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'workshop35-client';

  searchForm!: FormGroup;
  titles$!: Observable<Book[]>;

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control(''),
    });
  }

  keyPressed(event: any): void {
    let bookDetails: Details = {
      title: event.target.value,
    };

    this.titles$ = this.searchService.searchBookByJson(bookDetails);
    this.titles$.subscribe();
  }
}
