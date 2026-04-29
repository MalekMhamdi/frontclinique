import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService, Role } from '../../shared/services/auth.service';

interface RoleOption {
  value:       Role;
  label:       string;
  icon:        string;
  description: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  selectedRole = signal<Role>('patient');
  email        = signal('');
  password     = signal('');
  showPwd      = signal(false);
  loading      = signal(false);
  error        = signal('');

  roles: RoleOption[] = [
    { value: 'patient', label: 'Patient',  icon: '🧑‍⚕️', description: 'Access your health portal' },
    { value: 'doctor',  label: 'Doctor',   icon: '👨‍⚕️', description: 'Manage your patients'      },
    { value: 'admin',   label: 'Admin',    icon: '🛡️',  description: 'Manage the clinic'          },
    { value: 'labtech', label: 'Lab Tech', icon: '🔬',  description: 'Manage lab results'          },
  ];

  constructor(private authService: AuthService) {}

  get activeRole(): RoleOption {
    return this.roles.find(r => r.value === this.selectedRole())!;
  }

  selectRole(role: Role): void {
    this.selectedRole.set(role);
    this.error.set('');
  }

  togglePwd(): void { this.showPwd.update(v => !v); }

  async submit(): Promise<void> {
    this.error.set('');

    if (!this.email() || !this.password()) {
      this.error.set('Please fill in all fields.');
      return;
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(this.email())) {
      this.error.set('Please enter a valid email address.');
      return;
    }

    this.loading.set(true);
    try {
      await this.authService.login(this.email(), this.password(), this.selectedRole());
    } catch (e) {
      this.error.set('Invalid credentials. Please try again.');
    } finally {
      this.loading.set(false);
    }
  }
}