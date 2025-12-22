import { Routes } from '@angular/router';

// We export a constant that the main app.routes.ts will import lazily
export const AUTH_ROUTES: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];