import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BookItem } from 'src/app/models/googleBooksResponse';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Output() onBookClick = new EventEmitter<BookItem>()
  @Output() toggleSaveStatus = new EventEmitter<BookItem>()

  @Input() book: BookItem;
  @Input() saved: BookItem;


  constructor() { }

  ngOnInit(): void {
  }
  
  toggleBookStatus() {
    this.toggleSaveStatus.emit(this.book)
  }

  bookInfoClick() {
    this.onBookClick.emit(this.book);
  }
}
