import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  role: string = 'patient';

  constructor(private router: Router) {}

  onLogin() {

    console.log("LOGIN CLICKED");

    // Simulation login (normalement backend ici)

    switch (this.role) {
      case 'patient':
        this.router.navigate(['/patient']);
        break;

      case 'doctor':
        this.router.navigate(['/doctor']);
        break;

      case 'admin':
        this.router.navigate(['/admin']);
        break;

      case 'labtech':
        this.router.navigate(['/labtech']);
        break;

      default:
        console.warn("Role inconnu");
        break;
    }
  }
}