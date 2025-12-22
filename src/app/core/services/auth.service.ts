import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    // Signal to track the logged-in user state
    currentUser = signal<any>(null);

    register(userData: any) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
    }

    login(email: string, password: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find((u: any) => u.email === email && u.password === password);

        if (foundUser) {
            this.currentUser.set(foundUser);
            localStorage.setItem('user_session', JSON.stringify(foundUser));
            return true;
        }
        return false;
    }

    // ADD THIS METHOD: This fixes the TS2339 error
    logout() {
        this.currentUser.set(null);
        localStorage.removeItem('user_session');
        localStorage.removeItem('active_user');
    }
}