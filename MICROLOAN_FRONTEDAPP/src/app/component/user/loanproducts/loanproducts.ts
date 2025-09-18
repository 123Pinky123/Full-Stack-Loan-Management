import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngIf, [disabled], etc.

@Component({
  selector: 'app-loanproducts',
  standalone: true,
  imports: [CommonModule], // ✅ Add CommonModule here
  templateUrl: './loanproducts.html',
  styleUrls: ['./loanproducts.css']
})
export class Loanproducts {
  currentStep = 0;

  nextStep() {
    if (this.currentStep < 5) this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 0) this.currentStep--;
  }

  submitForm(event: Event) {
    event.preventDefault();
    alert('Application Submitted!');
  }
}
