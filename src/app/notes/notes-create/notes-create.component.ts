import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.scss']
})
export class NotesCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly notesService: NotesService) { }

  get f() { return this.form.controls; }
  
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  createNote() {
    if (this.form.invalid) {
      return;
    }

    this.notesService.createNote(this.form.value);
  }

}
