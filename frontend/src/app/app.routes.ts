import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/auth/sign-up-card.component').then(m => m.SignUpCardComponent)
  },
  {
    path: 'student',
    loadComponent: () => import('./pages/student/student-dashboard.component').then(m => m.StudentDashboardComponent)
  },
  {
    path: 'teacher',
    loadComponent: () => import('./pages/dashboard/teacher-dashboard.component').then(m => m.TeacherDashboardComponent)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/dashboard/analytics.component').then(m => m.AnalyticsComponent)
  }
]; 