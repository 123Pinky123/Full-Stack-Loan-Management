import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, RouterLink } from '@angular/router'; // Import RouterLink

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  timestamp: Date;
  action?: { label: string; link?: string; method?: string; args?: any[] };
}

@Component({
  selector: 'app-notifications',
  standalone: true, // Add standalone to true
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {
  showAll: boolean = false;

  notifications: Notification[] = [
    {
      id: 1, type: 'success', message: 'Your loan application has been successfully submitted!', timestamp: new Date('2025-10-05T10:00:00'),
      action: { label: 'View Application', link: '/user/applications' }
    },
    {
      id: 2, type: 'warning', message: 'Action required: Please upload your identification documents.', timestamp: new Date('2025-10-04T15:30:00'),
      action: { label: 'Upload Documents', link: '/user/profile' }
    },
    {
      id: 3, type: 'info', message: 'Your loan status has been updated. Check your dashboard for details.', timestamp: new Date('2025-10-03T08:00:00'),
      action: { label: 'View Dashboard', link: '/user/home' }
    },
    {
      id: 4, type: 'error', message: 'There was an error processing your request. Please try again later.', timestamp: new Date('2025-10-02T18:45:00'),
      action: { label: 'Retry', method: 'retryError', args: [4] }
    },
    {
      id: 5, type: 'success', message: 'Your recent payment has been processed successfully.', timestamp: new Date('2025-10-01T12:00:00'),
      action: { label: 'View Repayments', link: '/user/repayments' }
    },
    {
      id: 6, type: 'info', message: 'Reminder: Your EMI of ₹5,000 is due on 15 Oct 2025.', timestamp: new Date('2025-09-30T09:00:00'),
      action: { label: 'Pay Now', link: '/user/repayments' }
    }
  ];

  constructor(private router: Router) { }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  performAction(notification: Notification) {
    if (notification.action) {
      if (notification.action.link) {
        this.router.navigate([notification.action.link]);
      } else if (notification.action.method && typeof (this as any)[notification.action.method] === 'function') {
        (this as any)[notification.action.method](...(notification.action.args || []));
      }
    }
  }

  retryError(notificationId: number) {
    alert(`Retrying error for notification ID: ${notificationId}`);
    // Implement actual retry logic here
  }
}
