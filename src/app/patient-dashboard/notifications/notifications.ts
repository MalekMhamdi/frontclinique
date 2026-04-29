import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type NotifType = 'appointment' | 'result' | 'reminder' | 'message' | 'system';
type FilterTab = 'all' | 'unread' | 'appointment' | 'result' | 'reminder';

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class NotificationsComponent {

  activeFilter = signal<FilterTab>('all');

  notifications = signal<Notification[]>([
    {
      id: '1',
      type: 'appointment',
      title: 'Appointment Confirmed',
      body: 'Your consultation with Dr. Bennett on May 1, 2026 at 09:30 AM has been confirmed. Please arrive 10 minutes early.',
      timestamp: 'Today · 07:45 AM',
      read: false
    },
    {
      id: '2',
      type: 'result',
      title: 'Lab Results Available',
      body: 'Your blood test results from Mar 14 are now available in your Medical Record. Click to view.',
      timestamp: 'Yesterday · 02:22 PM',
      read: false
    },
    {
      id: '3',
      type: 'reminder',
      title: 'Prescription Reminder',
      body: 'Your Metformin 500 mg prescription expires on Jun 30, 2026. Please contact your doctor for a renewal.',
      timestamp: 'Apr 26 · 08:00 AM',
      read: false
    },
    {
      id: '4',
      type: 'message',
      title: 'Message from Dr. Bennett',
      body: 'Dr. Bennett has sent you a message regarding your latest blood test results. Please check your inbox.',
      timestamp: 'Apr 25 · 04:10 PM',
      read: false
    },
    {
      id: '5',
      type: 'appointment',
      title: 'Appointment Reminder',
      body: 'Reminder: You have a cardiology consultation with Dr. Taylor tomorrow, May 15 at 02:00 PM — Room 7, Floor 2.',
      timestamp: 'Apr 22 · 10:00 AM',
      read: true
    },
    {
      id: '6',
      type: 'result',
      title: 'Imaging Report Ready',
      body: 'Your chest X-ray report from Feb 2 is now available for download in your Medical Record.',
      timestamp: 'Feb 03 · 09:15 AM',
      read: true
    },
    {
      id: '7',
      type: 'system',
      title: 'Profile Updated',
      body: 'Your profile information was successfully updated on Jan 15, 2026.',
      timestamp: 'Jan 15 · 11:30 AM',
      read: true
    },
    {
      id: '8',
      type: 'reminder',
      title: 'Annual Check-up Due',
      body: 'It has been 12 months since your last general check-up. We recommend scheduling an appointment soon.',
      timestamp: 'Jan 10 · 08:00 AM',
      read: true
    }
  ]);

  filtered = computed(() => {
    const f = this.activeFilter();
    const all = this.notifications();
    if (f === 'all')      return all;
    if (f === 'unread')   return all.filter(n => !n.read);
    return all.filter(n => n.type === f);
  });

  unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  setFilter(f: FilterTab): void { this.activeFilter.set(f); }

  markRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllRead(): void {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  delete(id: string): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }

  typeIcon(type: NotifType): string {
    const map: Record<NotifType, string> = {
      appointment: '📅',
      result:      '🔬',
      reminder:    '⚠️',
      message:     '💬',
      system:      '⚙️'
    };
    return map[type];
  }

  typeClass(type: NotifType): string {
    const map: Record<NotifType, string> = {
      appointment: 'blue',
      result:      'green',
      reminder:    'amber',
      message:     'purple',
      system:      'gray'
    };
    return map[type];
  }

  typeLabel(type: NotifType): string {
    const map: Record<NotifType, string> = {
      appointment: 'Appointment',
      result:      'Result',
      reminder:    'Reminder',
      message:     'Message',
      system:      'System'
    };
    return map[type];
  }
}