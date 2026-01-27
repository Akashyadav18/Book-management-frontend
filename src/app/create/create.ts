import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book';
import { Book } from '../interfaces/Book';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  bookForm: FormGroup = new FormGroup({});
  bookId: number | null = null
  categories = ['Programming', 'Fiction', 'Science', 'History', 'Biography', 'Comics', 'Other'];


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      publicationYear: ['', Validators.required],
      category: ['', Validators.required]
    })

    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      this.bookService.getSelectedBook(this.bookId).subscribe((res) => {
        this.bookForm.patchValue({
          title: res.title,
          author: res.author,
          publicationYear: res.publicationYear,
          category: res.category
        });
        console.log("select book"+res);
        
      })
    }
  }

  get f() {
    return this.bookForm.controls;
  }

  submit() {
    
    if(this.bookForm.invalid) return;

    if (this.bookId) {
      const updatedBook = {
        id: this.bookId,
        ...this.bookForm.value
      };
      this.bookService.updateBook(updatedBook).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message || "Book Updated Successfully")
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.toastr.error(err?.error.message || "Something went wrong ");
        }
      })
    } else {
      this.bookService.saveBooks(this.bookForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toastr.success(res.message || "Book Created Successfully")
          this.router.navigate(['/'])
        },
        error: (err) => {
          this.toastr.error(err?.error.message || "Something went wrong ");
        }
      })
    }
  }

}
