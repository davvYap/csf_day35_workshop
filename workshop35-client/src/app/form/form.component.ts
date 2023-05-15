import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Book } from '../models';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  books$!: Observable<Book[]>;

  @Output()
  clearForm = new Subject<void>();

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control(''),
    });
  }

  searchBook(event: any): Observable<Book[]> {
    // clear Parent input form
    this.clearJSONForm();

    this.books$ = this.searchService.searchBookByForm(this.form.value.title);
    this.books$.subscribe();
    return this.books$;
  }

  resetForm(): void {
    this.form.reset();
  }

  clearJSONForm(): void {
    this.clearForm.next();
  }
}
