import { Injectable, signal } from '@angular/core';

export interface Patient {
  id:         string;
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

export interface Appointment {
  id:       string;
  type:     string;
  doctor:   string;
  location: string;
  date:     Date;
  time:     string;
  status:   'confirmed' | 'pending' | 'cancelled';
}

export interface Notification {
  id:        string;
  type:      'appointment' | 'result' | 'reminder' | 'message' | 'system';
  title:     string;
  body:      string;
  timestamp: string;
  read:      boolean;
}

export interface MedicalDocument {
  id:       string;
  title:    string;
  type:     'result' | 'prescription' | 'imaging' | 'report';
  doctor:   string;
  date:     string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

export interface Prescription {
  medication:  string;
  dosage:      string;
  frequency:   string;
  prescribedBy:string;
  expires:     string;
}

@Injectable({ providedIn: 'root' })
export class PatientService {

  patient = signal<Patient>({
    id:         '00421',
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

  appointments = signal<Appointment[]>([
    {
      id: '1', type: 'General Consultation',
      doctor: 'Dr. Bennett', location: 'Room 3, Floor 1',
      date: new Date(2026, 4, 1), time: '09:30 AM', status: 'confirmed'
    },
    {
      id: '2', type: 'Full Blood Panel',
      doctor: 'Central Laboratory', location: 'Ground Floor',
      date: new Date(2026, 4, 8), time: '07:00 AM', status: 'pending'
    },
    {
      id: '3', type: 'Cardiology Consultation',
      doctor: 'Dr. Taylor', location: 'Room 7, Floor 2',
      date: new Date(2026, 4, 15), time: '02:00 PM', status: 'confirmed'
    }
  ]);

  notifications = signal<Notification[]>([
    {
      id: '1', type: 'appointment',
      title: 'Appointment Confirmed',
      body: 'Your consultation with Dr. Bennett on May 1, 2026 at 09:30 AM has been confirmed.',
      timestamp: 'Today · 07:45 AM', read: false
    },
    {
      id: '2', type: 'result',
      title: 'Lab Results Available',
      body: 'Your blood test results are now available in your Medical Record.',
      timestamp: 'Yesterday · 02:22 PM', read: false
    },
    {
      id: '3', type: 'reminder',
      title: 'Prescription Reminder',
      body: 'Your Metformin 500 mg prescription expires on Jun 30, 2026.',
      timestamp: 'Apr 26 · 08:00 AM', read: false
    },
    {
      id: '4', type: 'message',
      title: 'Message from Dr. Bennett',
      body: 'Dr. Bennett has sent you a message regarding your latest blood test results.',
      timestamp: 'Apr 25 · 04:10 PM', read: false
    }
  ]);

  documents = signal<MedicalDocument[]>([
    { id: '1', title: 'Blood Test Results',    type: 'result',       doctor: 'Dr. Bennett', date: 'Mar 14, 2026', fileName: 'blood-test-results.pdf',   fileSize: '0.8 MB', fileType: 'PDF' },
    { id: '2', title: 'Prescription Renewal',  type: 'prescription', doctor: 'Dr. Bennett', date: 'Mar 14, 2026', fileName: 'prescription-renewal.pdf', fileSize: '0.3 MB', fileType: 'PDF' },
    { id: '3', title: 'Chest X-Ray',           type: 'imaging',      doctor: 'Radiology',   date: 'Feb 02, 2026', fileName: 'chest-xray.pdf',           fileSize: '2.4 MB', fileType: 'PDF' },
    { id: '4', title: 'Cardiology Report',     type: 'report',       doctor: 'Dr. Taylor',  date: 'Jan 10, 2026', fileName: 'cardiology-report.pdf',    fileSize: '1.1 MB', fileType: 'PDF' }
  ]);

  prescriptions = signal<Prescription[]>([
    { medication: 'Metformin',  dosage: '500 mg',  frequency: '2x / day', prescribedBy: 'Dr. Bennett', expires: 'Jun 30, 2026' },
    { medication: 'Amlodipine', dosage: '5 mg',    frequency: '1x / day', prescribedBy: 'Dr. Taylor',  expires: 'Aug 15, 2026' },
    { medication: 'Vitamin D3', dosage: '1000 IU', frequency: '1x / day', prescribedBy: 'Dr. Bennett', expires: 'Nov 28, 2026' }
  ]);

  // ── Actions ──

  cancelAppointment(id: string): void {
    this.appointments.update(list =>
      list.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a)
    );
  }

  markNotificationRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllNotificationsRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  updateProfile(data: Partial<Patient>): void {
    this.patient.update(p => ({ ...p, ...data }));
  }

  get unreadCount(): number {
    return this.notifications().filter(n => !n.read).length;
  }
}