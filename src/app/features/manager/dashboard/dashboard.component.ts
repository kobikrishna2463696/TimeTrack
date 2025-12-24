import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]
import { AuthService } from '../../../core/services/auth.service';

// Define the structure for our data
interface TeamMember {
  id: number;
  name: string;
  email: string;
  initials: string;
  totalHours: number;
  daysLogged: number;
}

interface TimeLog {
  employeeName: string;
  date: string;
  start: string;
  end: string;
  total: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  estimatedHours: number;
  status: 'Pending' | 'In Progress' | 'Completed';
}

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  // Make sure FormsModule is imported here to use [(ngModel)]
  imports: [CommonModule, TitleCasePipe, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class ManagerDashboardComponent {
  private authService = inject(AuthService);

  // 1. Auth State: Get the logged in user from our service
  user = computed(() => this.authService.currentUser());

  // 2. UI State: Handle tabs and modal visibility
  activeTab = signal<'team' | 'tasks' | 'analytics'>('team');
  showCreateModal = signal(false);

  // 3. Data State: Team members and task lists
  teamMembers = signal<TeamMember[]>([
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', initials: 'J', totalHours: 0, daysLogged: 0 },
    { id: 2, name: 'Emily Davis', email: 'emily.davis@company.com', initials: 'E', totalHours: 0, daysLogged: 0 },
    { id: 3, name: 'David Wilson', email: 'david.wilson@company.com', initials: 'D', totalHours: 0, daysLogged: 0 }
  ]);

  tasks = signal<Task[]>([
    { id: 1, title: 'Implement Authentication', description: 'Setup JWT flow', assignedTo: 'John Smith', estimatedHours: 16, status: 'In Progress' },
    { id: 2, title: 'Database Design', description: 'Create SQL schemas', assignedTo: 'Emily Davis', estimatedHours: 8, status: 'Completed' }
  ]);

  logs = signal<TimeLog[]>([]); // Empty state for time logs table

  // 4. Form State: Model for creating a new task
  newTask = {
    title: '',
    description: '',
    assignedTo: '',
    estimatedHours: 0
  };

  // 5. Computed Values
  totalTeamMembers = computed(() => this.teamMembers().length);

  // --- METHODS ---

  setTab(tab: 'team' | 'tasks' | 'analytics') {
    this.activeTab.set(tab);
  }

  openModal() {
    this.showCreateModal.set(true);
  }

  closeModal() {
    this.showCreateModal.set(false);
    this.resetForm();
  }

  resetForm() {
    this.newTask = {
      title: '',
      description: '',
      assignedTo: '',
      estimatedHours: 0
    };
  }

  /**
   * Logic to add a new task to the list
   */
  createTask() {
    if (this.newTask.title.trim() && this.newTask.assignedTo) {
      const task: Task = {
        id: Date.now(), // Generate a unique ID
        title: this.newTask.title,
        description: this.newTask.description,
        assignedTo: this.newTask.assignedTo,
        estimatedHours: this.newTask.estimatedHours,
        status: 'Pending'
      };

      // Add the new task to our signal array
      this.tasks.update(currentTasks => [...currentTasks, task]);

      this.closeModal();
    }
  }

  /**
   * Call the logout method from AuthService
   */
  logout() {
    this.authService.logout();
  }
}