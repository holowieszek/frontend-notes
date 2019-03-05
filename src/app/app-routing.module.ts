import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotesListComponent } from './notes/notes-list/notes-list.component';
import { NotesCreateComponent } from './notes/notes-create/notes-create.component';

const routes: Routes = [
  { path: 'notes', component: NotesListComponent, canActivate: [AuthGuard] },
  { path: 'notes/create', component: NotesCreateComponent, canActivate: [AuthGuard] },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
