import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf, *ngFor
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // ✅ Enable routerLink and active state
  templateUrl: './landingpage.html',
  styleUrls: ['./landingpage.css']
})
export class Landingpage implements OnInit {
  isLoggedIn: boolean = false;
  private readonly isBrowser: boolean;

  constructor(private router: Router, private authService: AuthService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.authService.isLoggedIn$.subscribe((v) => (this.isLoggedIn = v));
    }
  }

  logout(): void {
    if (this.isBrowser) {
      this.authService.logout();
    }
    this.isLoggedIn = false;
    this.router.navigate(['/landingpage']);
  }

  scrollToSection(sectionId: string): void {
    if (!this.isBrowser) return;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
