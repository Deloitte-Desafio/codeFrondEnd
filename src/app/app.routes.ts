import { Routes } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { DashboardClienteComponent } from './components/dashboard-cliente/dashboard-cliente.component';

export const routes: Routes = [
  { path: '', component: PerfilComponent },
  { path: 'dashboard-cliente', component: DashboardClienteComponent },
];
