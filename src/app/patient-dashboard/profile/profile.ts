import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Patient {
  firstName:  string;
  lastName:   string;
  birthDate:  string;
  gender:     string;
  bloodGroup: string;
  cin:        string;
  phone:      string;
  email:      string;
  address:    string;
  insurance:  string;
  emergency:  { name: string; relation: string; phone: string };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent {

  editing = signal(false);

  patient = signal<Patient>({
    firstName:  'John',
    lastName:   'Doe',
    birthDate:  'June 12, 1985',
    gender:     'Male',
    bloodGroup: 'O+',
    cin:        '08 435 621',
    phone:      '+1 (555) 456-7890',
    email:      'john.doe@email.com',
    address:    '123 Main Street, New York',
    insurance:  'Blue Cross · #445-2021',
    emergency: {
      name:     'Jane Doe',
      relation: 'Spouse',
      phone:    '+1 (555) 123-4567'
    }
  });

  draft = signal<Patient>({ ...this.patient() });

  get initials(): string {
    const p = this.patient();
    return `${p.firstName[0]}${p.lastName[0]}`;
  }

  startEdit(): void {
    this.draft.set({ ...this.patient(), emergency: { ...this.patient().emergency } });
    this.editing.set(true);
  }

  cancelEdit(): void { this.editing.set(false); }

  saveEdit(): void {
    this.patient.set({ ...this.draft() });
    this.editing.set(false);
  }
}