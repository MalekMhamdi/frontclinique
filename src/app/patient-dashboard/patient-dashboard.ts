import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule
  ],
  templateUrl: './patient-dashboard.html',
  styleUrl: './patient-dashboard.css'
})
export class PatientDashboard {

  // 🔹 Dark mode toggle
  darkMode = signal(false);

  toggleDark() {
    this.darkMode.set(!this.darkMode());
  }
  activeTab: string = 'view';
  patient = {
    name: 'Malek',
    age: '20',
    phone: '12345678',
    email: 'malek@gmail.com',
    gender: 'Female',
    photo: ''
  };
  saveProfile() {
  console.log("✅ Profile updated:", this.patient);
  alert("Profile updated!");
  }
  onFileSelected(event: any) {

    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.patient.photo = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  

  
  // 🔹 Chat IA simple
  userInput = '';
  messages: string[] = [];

  sendMessage() {
    if (!this.userInput) return;
    this.messages.push('🧑‍⚕️: ' + this.userInput);
    this.messages.push('🤖: Analyse en cours...');
    this.userInput = '';
  }

  // 🔹 Données stats
  stats = {
    consultations: 12,
    analyses: 5,
    rdv: 3
  };
}