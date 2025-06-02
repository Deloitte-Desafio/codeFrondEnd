import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';
import { AppointmentFormComponent } from './modules/client/components/appointment-form/appointment-form.component';
import { PerfilComponent } from './components/perfil/perfil.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' }, <- redireciona direto para login/ nao deixa entrar na agenda
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agendar', component:AppointmentFormComponent},
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'login' }
]