import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

type Tab = 'upcoming' | 'past' | 'cancelled';

interface Appointment {
  id: string;
  type: string;
  doctor: string;
  location: string;
  date: Date;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css'
})
export class AppointmentsComponent {

  activeTab = signal<Tab>('upcoming');

  appointments = signal<Appointment[]>([
    {
      id: '1',
      type: 'General Consultation',
      doctor: 'Dr. Bennett',
      location: 'Room 3, Floor 1',
      date: new Date(2026, 4, 1),
      time: '09:30 AM',
      status: 'confirmed'
    },
    {
      id: '2',
      type: 'Full Blood Panel',
      doctor: 'Central Laboratory',
      location: 'Ground Floor',
      date: new Date(2026, 4, 8),
      time: '07:00 AM',
      status: 'pending'
    },
    {
      id: '3',
      type: 'Cardiology Consultation',
      doctor: 'Dr. Taylor',
      location: 'Room 7, Floor 2',
      date: new Date(2026, 4, 15),
      time: '02:00 PM',
      status: 'confirmed'
    },
    {
      id: '4',
      type: 'Diabetes Follow-up',
      doctor: 'Dr. Santos',
      location: 'Room 2, Floor 1',
      date: new Date(2026, 2, 14),
      time: '11:00 AM',
      status: 'confirmed'
    }
  ]);

  get filtered(): Appointment[] {
    const now = new Date();
    switch (this.activeTab()) {
      case 'upcoming':
        return this.appointments().filter(a => a.status !== 'cancelled' && a.date >= now);
      case 'past':
        return this.appointments().filter(a => a.status !== 'cancelled' && a.date < now);
      case 'cancelled':
        return this.appointments().filter(a => a.status === 'cancelled');
    }
  }

  setTab(tab: Tab): void { this.activeTab.set(tab); }

  cancel(id: string): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointments.update(list =>
        list.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a)
      );
    }
  }

  statusLabel(status: string): string {
    return status === 'confirmed' ? 'Confirmed'
         : status === 'pending'   ? 'Pending'
         : 'Cancelled';
  }
}