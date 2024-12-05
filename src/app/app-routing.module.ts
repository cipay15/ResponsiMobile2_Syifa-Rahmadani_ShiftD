import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { autoLoginGuard } from './guard/auto-login.guard';

const routes: Routes = [
  {
    path: 'mahasiswa',
    loadChildren: () => import ('./mahasiswa/mahasiswa.module'). then (m => m.MahasiswaPageModule),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   
  },
  {
  path: 'login',
  loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  canActivate: [autoLoginGuard]
},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }