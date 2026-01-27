import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BookService } from '../services/book';
import { Book } from '../interfaces/Book';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  bookData: Book[] = []
  loading = true;

  constructor(private bookService: BookService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }


  //This is lifeCycle method/hook which will automatically called when page is loaded
  ngOnInit() {
    //when we call any api data, that api data is async, and to handle async Angular internally use
    //Observable, if U want to get data from observable then u have to subscribe,
    //and subscrible will return callback fun.
    // this.bookService.getBooks().subscribe((data:Book[]) => {
    //   console.log(data);
    //   this.bookData=data
    // })
    console.log("home page");
    this.getBook()
  }

  getBook() {
    this.loading = true;

    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        console.log(data);
        this.bookData = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loading = false;
      }
    })
  }

  // delete(id: number) {

  //   this.bookService.deleteBooks(id).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.toastr.success(res.message || "Book deleted Successfully")
  //       this.getBook();
  //     },
  //     error: (err) => {
  //       this.toastr.error(err?.error.message || "Something went wrong ");
  //     }
  //   })
  // }

  delete(book: Book) {
    const loggedUserId = Number(sessionStorage.getItem('USER_ID'));
    const bookUserId = Number(book.userId);
    if (!loggedUserId) {
      this.toastr.error("Please Login again")
      return;
    }
    if (bookUserId != loggedUserId) {
      this.toastr.error("You are not allowed to delete this book");
      return;
    }
    this.bookService.deleteBooks(book.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.toastr.success(res.message || "Book deleted Successfully")
        this.getBook();
      },
      error: (err) => {
        this.toastr.error(err?.error.message || "Something went wrong ");
      }
    })
  }

  // updateBook(id: number){
  //   console.log("edit", id);
  //   this.router.navigate(['/create', id]);
  // }

  updateBook(book: Book) {
    const loggedUserId = Number(sessionStorage.getItem('USER_ID'));
    if (book.userId !== loggedUserId) {
      this.toastr.error("You are not allowed to update this book");
      return;
    }
    if (!loggedUserId) {
      this.toastr.error("Please Login again")
      return;
    }
    this.router.navigate(['/create', book.id]);
  }

}
