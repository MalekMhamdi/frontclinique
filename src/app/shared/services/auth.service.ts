import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type Role = 'patient' | 'doctor' | 'admin' | 'labtech';

export interface CurrentUser {
  name:  string;
  email: string;
  role:  Role;
  id:    string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  currentUser = signal<CurrentUser | null>(null);
  isLoggedIn  = signal<boolean>(false);

  private readonly ROLE_ROUTES: Record<Role, string> = {
    patient: '/patient/profile',
    doctor:  '/doctor',
    admin:   '/admin',
    labtech: '/labtech'
  };

  constructor(private router: Router) {}

  async login(email: string, password: string, role: Role): Promise<void> {
    // TODO: Replace with real HTTP call
    // const res = await this.http.post('/api/auth/login', { email, password, role }).toPromise();

    this.currentUser.set({
      id:    '001',
      name:  'John Doe',
      email: email,
      role:  role
    });

    this.isLoggedIn.set(true);
    this.router.navigate([this.ROLE_ROUTES[role]]);
  }

  logout(): void {
    this.currentUser.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  get role(): Role | null {
    return this.currentUser()?.role ?? null;
  }

  get userName(): string {
    return this.currentUser()?.name ?? '';
  }
}