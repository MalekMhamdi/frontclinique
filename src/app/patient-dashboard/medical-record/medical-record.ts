import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-record.html',
  styleUrl: './medical-record.css'
})
export class MedicalRecordComponent {

  allergies = signal(['Penicillin', 'Ibuprofen', 'Peanuts']);

  prescriptions = signal([
    { medication: 'Metformin',   dosage: '500 mg',  frequency: '2x / day', doctor: 'Dr. Bennett', expires: 'Jun 30, 2026'  },
    { medication: 'Amlodipine',  dosage: '5 mg',    frequency: '1x / day', doctor: 'Dr. Taylor',  expires: 'Aug 15, 2026' },
    { medication: 'Vitamin D3',  dosage: '1000 IU', frequency: '1x / day', doctor: 'Dr. Bennett', expires: 'Nov 28, 2026'  }
  ]);

  documents = signal([
    { id: '1', title: 'Blood Test Results',       type: 'result',       doctor: 'Dr. Bennett', date: 'Mar 14, 2026' },
    { id: '2', title: 'Prescription Renewal',     type: 'prescription', doctor: 'Dr. Bennett', date: 'Mar 14, 2026' },
    { id: '3', title: 'Chest X-Ray',              type: 'imaging',      doctor: 'Radiology',   date: 'Feb 02, 2026' },
    { id: '4', title: 'Cardiology Report',        type: 'report',       doctor: 'Dr. Taylor',  date: 'Jan 10, 2026' }
  ]);

  docEmoji(type: string): string {
    const map: Record<string, string> = {
      result: '📋', prescription: '📄', imaging: '🩻', report: '📄'
    };
    return map[type] ?? '📄';
  }

  docClass(type: string): string {
    const map: Record<string, string> = {
      result: 'green', prescription: 'blue', imaging: 'amber', report: 'blue'
    };
    return map[type] ?? 'blue';
  }

  download(title: string): void {
    alert(`Downloading: ${title}`);
  }
}