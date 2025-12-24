import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.currentUser();

    if (user) {
        // If already logged in, send them to their dashboard
        const target = user.role.toLowerCase();
        router.navigate([`/${target}/dashboard`]);
        return false;
    }
    return true;
};
