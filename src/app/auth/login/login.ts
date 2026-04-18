import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,          // ✅ IMPORTANT
  imports: [RouterModule],   // ✅ recommandé
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {}
