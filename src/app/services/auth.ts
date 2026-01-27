import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.BASE_URL}/register`, data, {
      withCredentials: true
    });
  }

  login(data: any) {
    return this.http.post(`${this.BASE_URL}/login`, data, {
      withCredentials: true
    });
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/logout`, {}, {
      withCredentials: true
    });
  }
}
