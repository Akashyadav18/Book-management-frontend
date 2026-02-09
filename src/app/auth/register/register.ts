import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  city:string = ''
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.city = this.route.snapshot.params['city'] || '';
  }

  get reg() {
    return this.registerForm.controls;
  }
  
  submit() {
    if (this.registerForm.invalid) {
      this.toastr.error('Fill all fields');
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Registered Successfully');
        if (this.city) {
                this.router.navigate(['/', this.city, 'login']);
            } else {
                this.router.navigate(['/']);
            }
        // this.router.navigate(['/', city, 'login']);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Register Failed');
      }
    });
  }
}
