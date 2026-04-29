import { Component, computed, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboard {

  unreadCount = signal(4);

  constructor(private authService: AuthService) {}

  get patient() {
    return this.authService.currentUser;
  }

  get initials(): string {
    const name = this.authService.userName;
    if (!name) return 'JD';
    const parts = name.split(' ');
    return parts.length >= 2
      ? `${parts[0][0]}${parts[1][0]}`
      : parts[0][0];
  }

  get today(): string {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  logout(): void {
    this.authService.logout();
  }
}