
// // // src/app/features/auth/auth-routing.module.ts
// // import { NgModule } from '@angular/core';
// // import { RouterModule, Routes } from '@angular/router';
// // import { LoginComponent } from './login/login.component';

// import { AdminDashboardComponent } from "./features/admin/dashboard/dashboard.component";
// import { LoginComponent } from "./features/auth/login/login.component";
// import { RegisterComponent } from "./features/auth/register/register.component";
// import { ManagerDashboardComponent } from "./features/manager/dashboard/dashboard.component";
// import { LandingPageComponent } from "./features/auth/landing/landing.component";
// import { Routes } from "@angular/router";

// // const routes: Routes = [
// //     { path: 'login', component: LoginComponent } // final URL: /auth/login
// // ];

// // @NgModule({
// //     imports: [RouterModule.forChild(routes)],
// //     exports: [RouterModule]
// // })
// // export class AuthRoutingModule { }
// export const routes: Routes = [
//     // 1. Set the landing page as the default path
//     { path: '', component: LandingPageComponent },

//     // 2. Auth routes
//     { path: 'login', component: LoginComponent },
//     { path: 'register', component: RegisterComponent },

//     // 3. Dashboard routes (should be protected by guards)
//     {
//         path: 'admin/dashboard',
//         component: AdminDashboardComponent,
//         canActivate: [authGuard]
//     },
//     {
//         path: 'manager/dashboard',
//         component: ManagerDashboardComponent,
//         canActivate: [authGuard]
//     }
// ];