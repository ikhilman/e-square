import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleBooksResponse } from '../models/googleBooksResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  getResultByQuery(query: string): Observable<GoogleBooksResponse> {
    return this.http.get<GoogleBooksResponse>(`${environment.booksApi}?q=${query}+intitle`);
  }
}
