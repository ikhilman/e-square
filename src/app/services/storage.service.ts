import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { BookItem } from '../models/googleBooksResponse';
import { IKeyValue } from '../models/iKeyValue';
import { StorageKeys } from '../models/storageKeys';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _savedBooks$ = new BehaviorSubject<IKeyValue<BookItem>>({})

  constructor() {
    this.getBooksFromStorage();
  }

  getSavedBooks(): Observable<IKeyValue<BookItem>> {
    return this._savedBooks$.asObservable();
  }

  private getBooksFromStorage(): void {
    const booksStorage = localStorage.getItem(StorageKeys.SavedBooks);
    booksStorage && this._savedBooks$.next(JSON.parse(booksStorage));
  }

  async toggleBookStatus(book: BookItem) {
    const savedBooks: IKeyValue<BookItem> = await this.getSavedBooks().pipe(take(1)).toPromise();
    debugger
    if (savedBooks[book.id]) {
      delete savedBooks[book.id];
    } else {
      savedBooks[book.id] = book;
    }
    const booksToSave = JSON.stringify(savedBooks);
    localStorage.setItem(StorageKeys.SavedBooks, booksToSave)
    this._savedBooks$.next(savedBooks);
  }
}
