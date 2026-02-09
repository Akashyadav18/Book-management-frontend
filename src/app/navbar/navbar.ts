import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  city: string = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Get city from current URL
    this.city = this.getCityFromUrl();

    // Subscribe to route changes to update city
    this.router.events.subscribe(() => {
      this.city = this.getCityFromUrl();
    });
  }

  private getCityFromUrl(): string {
    const url = this.router.url;
    const segments = url.split('/').filter(s => s);

    // Check if first segment is a city (not 'login' or 'register')
    if (segments.length > 0 && segments[0] !== 'login' && segments[0] !== 'register') {
      return segments[0];
    }
    return '';
  }

  logout() {
        sessionStorage.clear();
        if (this.city) {
            this.router.navigate(['/', this.city, 'login']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}
