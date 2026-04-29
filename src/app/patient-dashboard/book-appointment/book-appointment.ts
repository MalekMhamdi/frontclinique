import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Specialty {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Doctor {
  id: string;
  specialtyId: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  reviews: number;
  avatar: string;
  availableDays: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css'
})
export class BookAppointmentComponent {

  step = signal<1 | 2 | 3>(1);

  selectedSpecialty = signal<Specialty | null>(null);
  selectedDoctor    = signal<Doctor | null>(null);
  selectedDate      = signal<string>('');
  selectedTime      = signal<string>('');
  reason            = signal<string>('');

  specialties: Specialty[] = [
    { id: 'cardio',   name: 'Cardiology',       icon: '❤️',  description: 'Heart & cardiovascular system' },
    { id: 'neuro',    name: 'Neurology',         icon: '🧠',  description: 'Brain & nervous system' },
    { id: 'ortho',    name: 'Orthopedics',       icon: '🦴',  description: 'Bones, joints & muscles' },
    { id: 'dermato',  name: 'Dermatology',       icon: '🩹',  description: 'Skin, hair & nails' },
    { id: 'general',  name: 'General Medicine',  icon: '🩺',  description: 'Primary care & prevention' },
    { id: 'ophthal',  name: 'Ophthalmology',     icon: '👁️',  description: 'Eyes & vision' },
    { id: 'pneumo',   name: 'Pulmonology',       icon: '🫁',  description: 'Lungs & respiratory system' },
    { id: 'gastro',   name: 'Gastroenterology',  icon: '🫃',  description: 'Digestive system' },
  ];

  doctors: Doctor[] = [
    { id: 'd1', specialtyId: 'cardio',  name: 'Dr. Sarah Bennett',  title: 'Cardiologist',        experience: '12 years', rating: 4.9, reviews: 214, avatar: 'SB', availableDays: ['Mon','Tue','Thu','Fri'] },
    { id: 'd2', specialtyId: 'cardio',  name: 'Dr. James Carter',   title: 'Cardiologist',        experience: '8 years',  rating: 4.7, reviews: 178, avatar: 'JC', availableDays: ['Mon','Wed','Fri'] },
    { id: 'd3', specialtyId: 'neuro',   name: 'Dr. Emily Walsh',    title: 'Neurologist',         experience: '15 years', rating: 4.8, reviews: 302, avatar: 'EW', availableDays: ['Tue','Wed','Thu'] },
    { id: 'd4', specialtyId: 'neuro',   name: 'Dr. Robert Kim',     title: 'Neurologist',         experience: '10 years', rating: 4.6, reviews: 145, avatar: 'RK', availableDays: ['Mon','Thu','Fri'] },
    { id: 'd5', specialtyId: 'ortho',   name: 'Dr. Michael Torres', title: 'Orthopedic Surgeon',  experience: '20 years', rating: 4.9, reviews: 420, avatar: 'MT', availableDays: ['Mon','Tue','Wed'] },
    { id: 'd6', specialtyId: 'ortho',   name: 'Dr. Lisa Park',      title: 'Orthopedic Surgeon',  experience: '9 years',  rating: 4.7, reviews: 189, avatar: 'LP', availableDays: ['Wed','Thu','Fri'] },
    { id: 'd7', specialtyId: 'dermato', name: 'Dr. Anna Wright',    title: 'Dermatologist',       experience: '7 years',  rating: 4.8, reviews: 231, avatar: 'AW', availableDays: ['Tue','Wed','Fri'] },
    { id: 'd8', specialtyId: 'general', name: 'Dr. Tom Bennett',    title: 'General Practitioner',experience: '14 years', rating: 4.6, reviews: 512, avatar: 'TB', availableDays: ['Mon','Tue','Wed','Thu','Fri'] },
    { id: 'd9', specialtyId: 'ophthal', name: 'Dr. Claire Moon',    title: 'Ophthalmologist',     experience: '11 years', rating: 4.9, reviews: 267, avatar: 'CM', availableDays: ['Mon','Wed','Thu'] },
    { id: 'd10',specialtyId: 'pneumo',  name: 'Dr. David Reeves',   title: 'Pulmonologist',       experience: '13 years', rating: 4.7, reviews: 198, avatar: 'DR', availableDays: ['Tue','Thu','Fri'] },
    { id: 'd11',specialtyId: 'gastro',  name: 'Dr. Nina Patel',     title: 'Gastroenterologist',  experience: '9 years',  rating: 4.8, reviews: 175, avatar: 'NP', availableDays: ['Mon','Wed','Fri'] },
  ];

  timeSlots: TimeSlot[] = [
    { time: '08:00 AM', available: true  },
    { time: '08:30 AM', available: false },
    { time: '09:00 AM', available: true  },
    { time: '09:30 AM', available: true  },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true  },
    { time: '11:00 AM', available: true  },
    { time: '11:30 AM', available: false },
    { time: '02:00 PM', available: true  },
    { time: '02:30 PM', available: true  },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true  },
    { time: '04:00 PM', available: true  },
    { time: '04:30 PM', available: false },
  ];

  filteredDoctors = computed(() => {
    const sp = this.selectedSpecialty();
    return sp ? this.doctors.filter(d => d.specialtyId === sp.id) : [];
  });

  get minDate(): string {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }

  get progressWidth(): string {
    return { 1: '33%', 2: '66%', 3: '100%' }[this.step()] ?? '33%';
  }

  get canConfirm(): boolean {
    return !!this.selectedDate() && !!this.selectedTime();
  }

  selectSpecialty(sp: Specialty): void {
    this.selectedSpecialty.set(sp);
    this.selectedDoctor.set(null);
    this.selectedDate.set('');
    this.selectedTime.set('');
  }

  selectDoctor(doc: Doctor): void {
    this.selectedDoctor.set(doc);
    this.selectedDate.set('');
    this.selectedTime.set('');
  }

  setDate(val: string): void {
    this.selectedDate.set(val);
    this.selectedTime.set('');
  }

  setTime(slot: TimeSlot): void {
    if (slot.available) this.selectedTime.set(slot.time);
  }

  setReason(val: string): void { this.reason.set(val); }

  nextStep(): void {
    if (this.step() === 1 && this.selectedSpecialty() && this.selectedDoctor()) {
      this.step.set(2);
    } else if (this.step() === 2 && this.canConfirm) {
      this.step.set(3);
    }
  }

  prevStep(): void {
    this.step.update(s => (s - 1) as 1 | 2 | 3);
  }

  confirm(): void {
    alert(`Appointment confirmed!\n\n${this.selectedDoctor()?.name}\n${this.selectedDate()} at ${this.selectedTime()}`);
  }

  starsArray(rating: number): string {
    return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '');
  }
}