import { Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CondominiosComponent } from './core/condominios/condominios.component';
import { AppComponent } from './core/component/component';
import { PacientesComponent } from './pages/tabelas/pacientes/pacientes';
import { FuncionariosComponent } from './pages/tabelas/funcionarios/funcionarios';
import { EstadioComponent } from './pages/tabelas/tabela-tnm/estadios/estadio';
import { AdministracaoHomeComponent } from './pages/administracao-home/administracao-home';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'home', component: AdministracaoHomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'condominios', component: CondominiosComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'estadios', component: EstadioComponent },
  { path: '**', redirectTo: 'home' }
];




