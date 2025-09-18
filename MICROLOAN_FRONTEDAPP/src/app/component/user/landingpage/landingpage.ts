// landingpage.component.ts
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './landingpage.html',
  styleUrls: ['./landingpage.css']
})
export class LandingpageComponent {
  constructor(private router: Router) {}

  // If you prefer programmatic navigation for CTAs (optional)
  goToProducts(): void {
    this.router.navigate(['/user/loanproducts']);
  }

  goToApplications(): void {
    this.router.navigate(['/user/applications']);
  }
}
