import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { PacientesComponent } from './pages/tabelas/pacientes/pacientes';
import { FuncionariosComponent } from './pages/tabelas/funcionarios/funcionarios';
import { EstadioComponent } from './pages/tabelas/tabela-tnm/estadios/estadio';
import { PaginaWebComponent } from './pages/pagina-web/pagina-web';
import { AdministracaoHomeComponent } from './pages/administracao-home/administracao-home';

export const routes: Routes = [
  
  { path: 'pagina-web', component: PaginaWebComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pacientes', component: PacientesComponent },
  { path: 'funcionarios', component: FuncionariosComponent },
  { path: 'estadios', component: EstadioComponent },
  { path: 'administracao-home', component: AdministracaoHomeComponent,
       children: [
          { path: 'pacientes', component: PacientesComponent },
          { path: 'funcionarios', component: FuncionariosComponent },
          { path: 'estadios', component: EstadioComponent },
       ]},
  
  { path: '', redirectTo: '/pagina-web', pathMatch: 'full' },
  { path: '**', redirectTo: '/pagina-web' },
];

