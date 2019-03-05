import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Note } from './note.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notes: Note[] = [];
  private notesUpdated = new Subject<{ notes: Note[] }>();
  private readonly url = environment.baseUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getNotes() {
    this.http.get<Note[]>(this.url + '/api/notes')
      .pipe(map(result => {
        return {
          notes: result.map(note => {
            return {
              id: note.id,
              created: note.created,
              title: note.title,
              description: note.description
            }
          })
        }
      }))
      .subscribe(transformedData => {
        this.notes = transformedData.notes;
        this.notesUpdated.next({
          notes: [...this.notes]
        })
      })
  }

  getNotesUpdateListener() {
    return this.notesUpdated.asObservable();
  }
}
