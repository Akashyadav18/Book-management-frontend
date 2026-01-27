import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('book_management');
}
