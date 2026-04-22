import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { Register } from './auth/register/register';
import { Home } from './pages/home/home';
import { PatientDashboard } from './patient-dashboard/patient-dashboard';
import { AppointmentsComponent } from './patient-dashboard/appointments/appointments';
import { ProfileComponent } from './patient-dashboard/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },
  
  // ⚠️ Ajout de la virgule ici
  { path: 'patient', component: PatientDashboard },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'patient/dashboard',
    loadComponent: () =>
      import('./patient-dashboard/patient-dashboard')
        .then(m => m.PatientDashboard)
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./patient-dashboard/appointments/appointments')
        .then(m => m.AppointmentsComponent)
  }
];