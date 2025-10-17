import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterLink, ActivatedRoute } from '@angular/router'; // Import RouterLink
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, RouterLink], // Add CommonModule and RouterLink to imports
  templateUrl: './applications.html',
  styleUrl: './applications.css'
})
export class Applications implements OnInit {
  selectedType: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.selectedType = params.get('type');
    });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
  }
}