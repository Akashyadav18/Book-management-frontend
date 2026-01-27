import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
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
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Register Failed');
      }
    });
  }
}
