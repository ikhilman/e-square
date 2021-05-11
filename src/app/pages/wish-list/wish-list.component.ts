import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { BookItem, GoogleBooksResponse } from 'src/app/models/googleBooksResponse';
import { IKeyValue } from 'src/app/models/iKeyValue';
import { SearchService } from 'src/app/services/search.service'
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  savedBooksSubscription: Subscription;

  books$ = new Observable<BookItem[]>();

  constructor(
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.subscribeToSavedBooks();
    this.books$ = this.subscribeToSavedBooks();
  }

  toggleSaveStatus(book: BookItem): void {
    this.storageService.toggleBookStatus(book);
  }

  subscribeToSavedBooks(): Observable<BookItem[]> {
    return this.storageService.getSavedBooks()
      .pipe(map(data => {
        return Object.values(data)
      }));
  }
}

