import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from './service/search.service';
import { Book, Details } from './models';
import { Observable } from 'rxjs';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'workshop35-client';

  searchForm!: FormGroup;
  titles$!: Observable<Book[]>;

  @ViewChild(FormComponent)
  formComponent!: FormComponent;

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
    // clear child input form
    this.clearForm();

    let bookDetails: Details = {
      title: event.target.value,
    };

    this.titles$ = this.searchService.searchBookByJson(bookDetails);
    this.titles$.subscribe();
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  clearForm(): void {
    this.formComponent.resetForm();
  }
}
