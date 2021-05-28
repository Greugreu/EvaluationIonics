import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ArtItems } from '../models/art-items';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  // API path
  artItemsPath = 'http://localhost:3000/artitems';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  // Create a new item
  createItem(item): Observable<ArtItems> {
    return this.http
      .post<ArtItems>(this.artItemsPath, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get items
  getList(): Observable<ArtItems> {
    return this.http
      .get<ArtItems>(this.artItemsPath)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get item by ID
  getItem(id): Observable<ArtItems> {
    return this.http
      .get<ArtItems>(this.artItemsPath + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item
  updateItem(id, item): Observable<ArtItems> {
    return this.http
      .put<ArtItems>(this.artItemsPath + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item
  deleteItem(id) {
    return this.http
      .delete<ArtItems>(this.artItemsPath + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
