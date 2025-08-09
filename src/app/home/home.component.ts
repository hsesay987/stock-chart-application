import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  showData() {
    const symbol = this.searchTerm.trim();
    if (symbol) {
      this.router.navigate(['/data', symbol.toUpperCase()]);
    }
  }
}
