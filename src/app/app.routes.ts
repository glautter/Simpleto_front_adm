import { Routes } from '@angular/router';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CondominiosComponent } from './core/condominios/condominios.component';
import { AppComponent } from './core/component/component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'condominios', component: CondominiosComponent },
  { path: '**', redirectTo: '' }
];