import { Routes } from '@angular/router';
import { LandingComponent } from './features/auth/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
    },
    {
        path: 'manager',
        loadChildren: () => import('./features/manager/manager.routes').then(m => m.MANAGER_ROUTES)
    },
    {
        path: 'employee',
        loadChildren: () => import('./features/employee/employee.routes').then(m => m.EMPLOYEE_ROUTES)
    }
];