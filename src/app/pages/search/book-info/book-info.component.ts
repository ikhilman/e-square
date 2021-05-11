import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BookItem } from '../../../models/googleBooksResponse'

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent {

  @Input() book: BookItem;

  @Output() dismissDialog = new EventEmitter<void>();

  onDialogDismiss() {
    this.dismissDialog.emit();
  }
}
