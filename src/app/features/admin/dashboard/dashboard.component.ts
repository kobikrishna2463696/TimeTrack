import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent {
  private authService = inject(AuthService);
  userProfile = this.authService.currentUser;

  // --- NAVIGATION & MODAL STATE ---
  currentTab = signal('User Management');
  showModal = signal(false);
  private trendChart: any;
  private pieChart: any;

  // --- USER MANAGEMENT DATA ---
  usersList = signal([
    { name: 'John Smith', email: 'john.smith@company.com', role: 'Employee', department: 'Engineering', status: 'Active' },
    { name: 'umesh', email: 'umes@gmail.com', role: 'Employee', department: 'manager', status: 'Active' }
  ]);

  // --- GLOBAL HEADER STATS ---
  totalUsers = computed(() => this.usersList().length);
  activeUsers = computed(() => this.usersList().filter(u => u.status === 'Active').length);
  hoursLogged = signal(39);
  totalTasks = signal(5);

  // --- ORGANIZATION ANALYTICS DATA ---
  departmentPerformance = [
    { name: 'Engineering', employees: 4, totalHours: 39.3, tasks: 1, avg: 9.8 },
    { name: 'IT', employees: 1, totalHours: 0, tasks: 0, avg: 0.0 },
    { name: 'Marketing', employees: 1, totalHours: 0, tasks: 0, avg: 0.0 }
  ];

  organizationalInsights = [
    { title: 'Productivity Overview', icon: '🕒', color: 'blue', desc: 'Organization has logged 39 total hours with an average of 9.8 hours per employee.' },
    { title: 'Task Performance', icon: '📈', color: 'green', desc: '20% task completion rate across the organization.' },
    { title: 'Department Distribution', icon: '🏢', color: 'purple', desc: '3 departments with an average of 2.0 employees per department.' }
  ];

  roleDistribution = [
    { label: 'Employees', count: 4, color: '#6366f1' },
    { label: 'Managers', count: 1, color: '#8b5cf6' },
    { label: 'Admins', count: 1, color: '#ec4899' }
  ];

  // --- SYSTEM CONFIGURATION DATA ---
  workCategories = signal([
    { name: 'Development', color: '#3b82f6', code: '#3b82f6', status: 'Active' },
    { name: 'Design', color: '#8b5cf6', code: '#8b5cf6', status: 'Active' },
    { name: 'Meeting', color: '#ec4899', code: '#ec4899', status: 'Active' },
    { name: 'Documentation', color: '#10b981', code: '#10b981', status: 'Active' },
    { name: 'Testing', color: '#f59e0b', code: '#f59e0b', status: 'Active' }
  ]);

  newUser = { name: '', email: '', role: 'Employee', department: '' };

  constructor() {
    // Re-initialize charts whenever the Analytics tab is selected
    effect(() => {
      if (this.currentTab() === 'Organization Analytics') {
        setTimeout(() => this.initCharts(), 0);
      }
    });
  }

  initCharts() {
    const trendCtx = document.getElementById('hoursTrendChart') as HTMLCanvasElement;
    if (trendCtx) {
      if (this.trendChart) this.trendChart.destroy();
      this.trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
          labels: ['Dec 16', 'Dec 17', 'Dec 18', 'Dec 19', 'Dec 20', 'Dec 21', 'Dec 22'],
          datasets: [{
            label: 'Hours Logged',
            data: [1, 2, 1.5, 3, 2.5, 3.5, 5],
            borderColor: '#6366f1',
            fill: true,
            tension: 0.4,
            backgroundColor: 'rgba(99, 102, 241, 0.1)'
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    }

    const pieCtx = document.getElementById('roleDistChart') as HTMLCanvasElement;
    if (pieCtx) {
      if (this.pieChart) this.pieChart.destroy();
      this.pieChart = new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Employees', 'Managers', 'Admins'],
          datasets: [{
            data: [4, 1, 1],
            backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899']
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }

  saveUser() {
    if (this.newUser.name && this.newUser.email) {
      this.usersList.update(users => [...users, { ...this.newUser, status: 'Active' }]);
      this.newUser = { name: '', email: '', role: 'Employee', department: '' };
      this.showModal.set(false);
    }
  }

  logout() { this.authService.logout(); }
}