import { Routes } from '@angular/router';

// Make sure 'export' is at the start of this line
export const EMPLOYEE_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.EmployeeDashboardComponent)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];