import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.maxLength(30)]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  }

  get login(){
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.invalid) {
      this.toastr.error('Fill all fields');
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message || 'Login Success');
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('USER_ID', res.data.id);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err?.error?.message || 'Login Failed');
      }
    });
  }
}
