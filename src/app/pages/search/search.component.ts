import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import { GoogleBooksResponse } from 'src/app/models/googleBooksResponse';
import { SearchService } from 'src/app/services/search.service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormControl: FormControl;
  searchResult$ = new Observable<GoogleBooksResponse>();
  searchResultSubscription: Subscription;

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.setSearchFormControl();
    this.subscribeToInputValueChanges();
  }

  setSearchFormControl(): void {
    this.searchFormControl = new FormControl('');
  }

  subscribeToInputValueChanges(): void {
    this.searchResult$ = this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(inputValue => inputValue ?
          this.searchService.getResultByQuery(inputValue) :
          of(null))
      )
  }
}
