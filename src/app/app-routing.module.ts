import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeasComponent } from './ideas/ideas.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'ideas', component: IdeasComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
