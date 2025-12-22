import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold">Manager Dashboard</h1>
      <p>Welcome to the manager portal.</p>
    </div>
  `
})
// Ensure this EXACT name is used here
export class ManagerDashboardComponent { }