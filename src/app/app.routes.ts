import { Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  {
    path: 'client',
    canActivate: [AuthGuard],
    data: { role: 'CLIENTE' },
    children: [
      {
        path: 'dash',
        loadComponent: () =>
          import('./client/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'schedule/:id',
        loadComponent: () =>
          import('./client/schedule/schedule.component').then(
            (m) => m.ScheduleComponent
          ),
      },
      {
        path: 'appointments',
        loadComponent: () =>
          import('./client/appointments/appointments.component').then(
            (m) => m.AppointmentsComponent
          ),
      },
      {
        path: 'servicos',
        loadComponent: () =>
          import('./client/listar-servicos/listar-servicos.component').then(
            (m) => m.ListarServicosComponent
          ),
      },
      {
        path: 'agendar',
        loadComponent: () =>
          import('./client/agendar-servico/agendar-servico.component').then(
            (m) => m.AgendarServicoComponent
          ),
      },
    ],
  },
  {
    path: 'professional',
    canActivate: [AuthGuard],
    data: { role: 'PROFISSIONAL' },
    children: [
      {
        path: 'dash',
        loadComponent: () =>
          import('./professional/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./professional/services/services.component').then(
            (m) => m.ServicesComponent
          ),
      },
      {
        path: 'availability',
        loadComponent: () =>
          import('./professional/availability/availability.component').then(
            (m) => m.AvailabilityComponent
          ),
      },
      {
        path: 'agenda',
        loadComponent: () =>
          import('./professional/agenda/agenda.component').then(
            (m) => m.AgendaComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' },
];
