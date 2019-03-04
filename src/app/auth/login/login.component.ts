import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onLogin() {
    if (this.form.invalid) {
      return;
    }

    const data = {
      username: this.form.value.username,
      password: this.form.value.password
    };

    this.authService.login(data);
  }

}
