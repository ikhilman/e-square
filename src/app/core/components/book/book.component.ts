import { Component, Input, OnInit } from '@angular/core';
import { BookItem } from 'src/app/models/googleBooksResponse';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input() book: BookItem;
  
  constructor() { }

  ngOnInit(): void {
  }


  toggleBookStatus(){
    
  }
}
