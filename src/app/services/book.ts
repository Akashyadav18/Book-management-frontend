import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})
export class BookService  {
  
  constructor(private http:HttpClient) {}
  

  //when we r handling data, so this is promise, observable r used to handle that promise
  getBooks():Observable<Book[]>{
    const url="http://localhost:8080/api/books/getAllBooks";
    return this.http.get<Book[]>(url, { withCredentials: true });
  }

  saveBooks(book:Book):Observable<Book>{
    const url="http://localhost:8080/api/books/createBook";
    return this.http.post<Book>(url, book, { withCredentials: true });
  }

  deleteBooks(id: number): Observable<string> {
  const url="http://localhost:8080/api/books/deleteBook";
  return this.http.delete(url + "/" + id, {
    responseType: 'text',
    withCredentials: true 
  });
}

  getSelectedBook(id:number):Observable<Book>{
    const url="http://localhost:8080/api/books/getBook";
    return this.http.get<Book>(url+"/"+id, { withCredentials: true });
  }

  updateBook(book:Book):Observable<Book>{
    const url="http://localhost:8080/api/books/updateBook";
    return this.http.put<Book>(url+"/"+book.id, book, { withCredentials: true });
  }
}
