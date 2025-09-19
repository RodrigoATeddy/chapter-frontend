import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard.component';
import { Login } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Dashboard },
];
