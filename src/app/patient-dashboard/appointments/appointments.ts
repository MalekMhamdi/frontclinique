import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./appointments.css']
})
export class AppointmentsComponent {

  // ======================
  // DATE + TIME
  // ======================
  selectedDate: string = '';
  selectedTime: string = '';
  appointmentsList: any[] = [];
  times = ['10:00', '11:00', '12:00', '14:00'];

  // ======================
  // PATIENT
  // ======================
  patient: any = {
    name: '',
    age: '',
    phone: '',
    gender: '',
    email: ''
  };

  // ======================
  // SPECIALITY + DOCTORS
  // ======================
  specialities = [
    { id: 1, name: 'Dermatologist' },
    { id: 2, name: 'Cardiologist' }
  ];

  allDoctors = [
    { id: 1, name: 'Dr. Ali', specialityId: 1 },
    { id: 2, name: 'Dr. Sara', specialityId: 2 }
  ];

  doctors: any[] = [];

  appointment: any = {
    specialityId: '',
    doctorId: ''
  };

  // ======================
  // GETTERS (SUMMARY)
  // ======================
  get selectedDoctor() {
    return this.allDoctors.find(d => d.id == this.appointment.doctorId);
  }

  get selectedSpeciality() {
    return this.specialities.find(s => s.id == this.appointment.specialityId);
  }

  // ======================
  // ACTIONS
  // ======================

  onSpecialityChange() {
    this.doctors = this.allDoctors.filter(
      d => d.specialityId == this.appointment.specialityId
    );

    // reset doctor when speciality changes
    this.appointment.doctorId = '';
  }
  editAppointment(index: number) {
  const rdv = this.appointmentsList[index];

  this.patient = rdv.patient;
  this.selectedDate = rdv.date;
  this.selectedTime = rdv.time;
  this.appointment = rdv.appointment;

  // supprimer ancien RDV pour le remplacer
  this.appointmentsList.splice(index, 1);
}

  selectTime(time: string) {
    this.selectedTime = time;
  }
  cancelAppointment(index: number) {
  this.appointmentsList.splice(index, 1);
}
get upcomingAppointments() {
  return this.appointmentsList.filter(rdv => {
    return new Date(rdv.date) >= new Date();
  });
}
get pastAppointments() {
  return this.appointmentsList.filter(rdv => {
    return new Date(rdv.date) < new Date();
  });
}

  confirm() {

  const newRdv = {
    patient: this.patient,
    appointment: this.appointment,
    date: this.selectedDate,
    time: this.selectedTime,
    doctor: this.selectedDoctor,
    speciality: this.selectedSpeciality
  };

  this.appointmentsList.push(newRdv);

  console.log("✅ RDV enregistré :", newRdv);

  // reset form
  this.patient = {};
  this.selectedDate = '';
  this.selectedTime = '';
  this.appointment = { specialityId: '', doctorId: '' };
}
}