import { Routes } from '@angular/router';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeDashboardComponent },
  { path: '**', redirectTo: '' }
];
