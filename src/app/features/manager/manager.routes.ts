import { Routes } from '@angular/router';

export const MANAGER_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.ManagerDashboardComponent)
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];