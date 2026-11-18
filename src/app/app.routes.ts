import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Usuario } from './usuario/usuario';
import { Admin } from './admin/admin';
import { Feed } from './feed/feed';
import { authGuard } from './guards/auth-guard-guard';
import { adminGuard } from './guards/admin-guard-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'usuario',
    component: Usuario,
    canActivate: [authGuard]
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [adminGuard]
  },
  {
    path: 'feed',
    component: Feed,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];