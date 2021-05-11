import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BookItem, GoogleBooksResponse } from 'src/app/models/googleBooksResponse';
import { IKeyValue } from 'src/app/models/iKeyValue';
import { SearchService } from 'src/app/services/search.service'
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  savesBooksMap: IKeyValue<BookItem> = {};
  savedBooksSubscription: Subscription;

  searchFormControl: FormControl;
  searchResult$ = new Observable<GoogleBooksResponse>();
  currentBook: BookItem;

  constructor(
    private searchService: SearchService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.setSearchFormControl();
    this.subscribeToInputValueChanges();
    this.subscribeToSavedBooks();
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

  onBookClick(book: BookItem): void {
    this.currentBook = book;
  }

  toggleSaveStatus(book: BookItem): void {
    this.storageService.toggleBookStatus(book);
  }

  dismissDialog() {
    this.currentBook = null;
  }

  subscribeToSavedBooks() {
    this.savedBooksSubscription = this.storageService.getSavedBooks()
      .subscribe(books => this.savesBooksMap = books);
  }


  ngOnDestroy(): void {
    this.savedBooksSubscription?.unsubscribe();
  }
}
