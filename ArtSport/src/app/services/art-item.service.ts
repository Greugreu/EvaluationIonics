import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtItems } from '../models/art-items';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtItemService {
  private url: string = "http://localhost:3000/artitems";

  constructor(public http: HttpClient){}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Get single Employee data by ID
  getItem(id): Observable<ArtItems> {
    return this.http
      .get<ArtItems>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get Employees data
  getList(): Observable<ArtItems> {
    return this.http
      .get<ArtItems>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  add(item: ArtItems){
    return this.http.post<ArtItems>(this.url, item);
  }
  // Update item by id
  updateItem(id, item): Observable<ArtItems> {
    return this.http
      .put<ArtItems>(this.url + '/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id) {
    return this.http
      .delete<ArtItems>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
