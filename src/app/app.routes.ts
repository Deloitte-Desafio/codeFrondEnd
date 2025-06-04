import { Routes } from '@angular/router';
import { LoginComponent } from './modules/client/pages/login/login.component';
import { RegisterComponent } from './modules/client/pages/register/register.component';
import { AppointmentFormComponent } from './modules/client/pages/appointment-form/appointment-form.component';
import { PerfilComponent } from './modules/client/pages/perfil/perfil.component';
import { DashboardClienteComponent } from './modules/client/pages/dashboard-cliente/dashboard-cliente.component';
import { ListarServicosComponent } from './modules/client/pages/servicos/listar-servicos/listar-servicos.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, <- redireciona direto para login/ nao deixa entrar na agenda
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agendar', component:AppointmentFormComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: 'dash', component: DashboardClienteComponent},
  { path: 'servicos', component: ListarServicosComponent},
  { path: '**', redirectTo: 'register' }
]