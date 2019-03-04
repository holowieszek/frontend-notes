import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from '../note.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  private notesSubscription: Subscription;

  constructor(
    private readonly notesService: NotesService
  ) { }

  ngOnInit() {
    this.notesService.getNotes();
    this.notesSubscription = this.notesService.getNotesUpdateListener()
      .subscribe((notesData: { notes: Note[] }) => {
        this.notes = notesData.notes
      })
  }

}
