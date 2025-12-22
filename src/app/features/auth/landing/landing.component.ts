import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="landing-wrapper">
      <div class="cards-container">
        <div class="role-card" (click)="selectRole('Employee')">
          <div class="icon">👤</div>
          <h3>EMPLOYEE</h3>
          <button class="login-btn">Login</button>
        </div>

        <div class="role-card" (click)="selectRole('Manager')">
          <div class="icon">👥</div>
          <h3>MANAGER</h3>
          <button class="login-btn">Login</button>
        </div>

        <div class="role-card" (click)="selectRole('Admin')">
          <div class="icon">⚙️</div>
          <h3>ADMIN</h3>
          <button class="login-btn">Login</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  private router = inject(Router);

  selectRole(role: string) {
    this.router.navigate(['/auth/login'], { queryParams: { role: role } });
  }
}