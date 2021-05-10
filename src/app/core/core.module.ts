import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BookComponent } from './components/book/book.component';



@NgModule({
  declarations: [HeaderComponent, BookComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    BookComponent
  ]
})
export class CoreModule { }
