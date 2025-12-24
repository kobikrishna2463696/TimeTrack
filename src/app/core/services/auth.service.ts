import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private router = inject(Router);
    private platformId = inject(PLATFORM_ID);

    // Signal to store the user name and role for the dashboard header
    currentUser = signal<any>(null);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const savedUser = localStorage.getItem('user_session');
            if (savedUser) {
                this.currentUser.set(JSON.parse(savedUser));
            }
        }
    }

    // Resolves TS2339: Property 'register' does not exist
    register(userData: any) {
        if (isPlatformBrowser(this.platformId)) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            // Auto-login after registration
            this.currentUser.set(userData);
            localStorage.setItem('user_session', JSON.stringify(userData));
            this.navigateToDashboard(userData.role);
        }
    }

    login(email: string, password: string): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (foundUser) {
                this.currentUser.set(foundUser);
                localStorage.setItem('user_session', JSON.stringify(foundUser));
                this.navigateToDashboard(foundUser.role);
                return true;
            }
        }
        return false;
    }

    private navigateToDashboard(role: string) {
        // Moves to /admin/dashboard, /manager/dashboard, etc.
        const route = role.toLowerCase();
        this.router.navigate([`/${route}/dashboard`]);
    }

    logout() {
        this.currentUser.set(null);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('user_session');
        }
        this.router.navigate(['/landing']);
    }
}