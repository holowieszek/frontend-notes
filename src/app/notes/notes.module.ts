import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { NotesListComponent } from './notes-list/notes-list.component';

@NgModule({
  declarations: [NotesComponent, NotesListComponent],
  imports: [
    CommonModule
  ]
})
export class IdeasModule { }
