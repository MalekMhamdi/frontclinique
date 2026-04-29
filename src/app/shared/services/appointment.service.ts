import { Injectable, signal } from '@angular/core';

export interface Specialty {
  id:          string;
  name:        string;
  icon:        string;
  description: string;
}

export interface Doctor {
  id:            string;
  specialtyId:   string;
  name:          string;
  title:         string;
  experience:    string;
  rating:        number;
  reviews:       number;
  avatar:        string;
  availableDays: string[];
}

export interface TimeSlot {
  time:      string;
  available: boolean;
}

export interface BookingData {
  specialtyId: string;
  doctorId:    string;
  date:        string;
  time:        string;
  reason:      string;
}

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  specialties = signal<Specialty[]>([
    { id: 'cardio',  name: 'Cardiology',      icon: '❤️',  description: 'Heart & cardiovascular system' },
    { id: 'neuro',   name: 'Neurology',        icon: '🧠',  description: 'Brain & nervous system'        },
    { id: 'ortho',   name: 'Orthopedics',      icon: '🦴',  description: 'Bones, joints & muscles'      },
    { id: 'dermato', name: 'Dermatology',      icon: '🩹',  description: 'Skin, hair & nails'            },
    { id: 'general', name: 'General Medicine', icon: '🩺',  description: 'Primary care & prevention'    },
    { id: 'ophthal', name: 'Ophthalmology',    icon: '👁️', description: 'Eyes & vision'                },
    { id: 'pneumo',  name: 'Pulmonology',      icon: '🫁',  description: 'Lungs & respiratory system'   },
    { id: 'gastro',  name: 'Gastroenterology', icon: '🫃',  description: 'Digestive system'             },
  ]);

  doctors = signal<Doctor[]>([
    { id: 'd1',  specialtyId: 'cardio',  name: 'Dr. Sarah Bennett',  title: 'Cardiologist',         experience: '12 years', rating: 4.9, reviews: 214, avatar: 'SB', availableDays: ['Mon','Tue','Thu','Fri'] },
    { id: 'd2',  specialtyId: 'cardio',  name: 'Dr. James Carter',   title: 'Cardiologist',         experience: '8 years',  rating: 4.7, reviews: 178, avatar: 'JC', availableDays: ['Mon','Wed','Fri']       },
    { id: 'd3',  specialtyId: 'neuro',   name: 'Dr. Emily Walsh',    title: 'Neurologist',          experience: '15 years', rating: 4.8, reviews: 302, avatar: 'EW', availableDays: ['Tue','Wed','Thu']       },
    { id: 'd4',  specialtyId: 'neuro',   name: 'Dr. Robert Kim',     title: 'Neurologist',          experience: '10 years', rating: 4.6, reviews: 145, avatar: 'RK', availableDays: ['Mon','Thu','Fri']       },
    { id: 'd5',  specialtyId: 'ortho',   name: 'Dr. Michael Torres', title: 'Orthopedic Surgeon',   experience: '20 years', rating: 4.9, reviews: 420, avatar: 'MT', availableDays: ['Mon','Tue','Wed']       },
    { id: 'd6',  specialtyId: 'ortho',   name: 'Dr. Lisa Park',      title: 'Orthopedic Surgeon',   experience: '9 years',  rating: 4.7, reviews: 189, avatar: 'LP', availableDays: ['Wed','Thu','Fri']       },
    { id: 'd7',  specialtyId: 'dermato', name: 'Dr. Anna Wright',    title: 'Dermatologist',        experience: '7 years',  rating: 4.8, reviews: 231, avatar: 'AW', availableDays: ['Tue','Wed','Fri']       },
    { id: 'd8',  specialtyId: 'general', name: 'Dr. Tom Bennett',    title: 'General Practitioner', experience: '14 years', rating: 4.6, reviews: 512, avatar: 'TB', availableDays: ['Mon','Tue','Wed','Thu','Fri'] },
    { id: 'd9',  specialtyId: 'ophthal', name: 'Dr. Claire Moon',    title: 'Ophthalmologist',      experience: '11 years', rating: 4.9, reviews: 267, avatar: 'CM', availableDays: ['Mon','Wed','Thu']       },
    { id: 'd10', specialtyId: 'pneumo',  name: 'Dr. David Reeves',   title: 'Pulmonologist',        experience: '13 years', rating: 4.7, reviews: 198, avatar: 'DR', availableDays: ['Tue','Thu','Fri']       },
    { id: 'd11', specialtyId: 'gastro',  name: 'Dr. Nina Patel',     title: 'Gastroenterologist',   experience: '9 years',  rating: 4.8, reviews: 175, avatar: 'NP', availableDays: ['Mon','Wed','Fri']       },
  ]);

  timeSlots = signal<TimeSlot[]>([
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
  ]);

  getDoctorsBySpecialty(specialtyId: string): Doctor[] {
    return this.doctors().filter(d => d.specialtyId === specialtyId);
  }

  getAvailableSlots(doctorId: string, date: string): TimeSlot[] {
    // TODO: Replace with real API call
    return this.timeSlots();
  }

  bookAppointment(data: BookingData): void {
    // TODO: Replace with real HTTP POST
    console.log('Booking appointment:', data);
  }

  cancelAppointment(id: string): void {
    // TODO: Replace with real HTTP PATCH
    console.log('Cancelling appointment:', id);
  }

  rescheduleAppointment(id: string, newDate: string, newTime: string): void {
    // TODO: Replace with real HTTP PATCH
    console.log('Rescheduling appointment:', id, newDate, newTime);
  }
}