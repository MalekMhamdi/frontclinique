
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent {

  activeTab: string = 'view';

  patient = {
    name: 'Malek',
    age: '20',
    phone: '12345678',
    email: 'test@gmail.com',
    gender: 'Female',
    photo: ''
  };

  // 👉 UPDATE PROFILE = reset form
  
openUpdateProfile() {
  this.activeTab = 'edit';

  this.patient.name = '';
  this.patient.age = '';
  this.patient.phone = '';
  this.patient.email = '';
  this.patient.gender = '';
  this.patient.photo = '';
}

  saveProfile() {
    console.log("Profile saved", this.patient);
    this.activeTab = 'view';
  }
}