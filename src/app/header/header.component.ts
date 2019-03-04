import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  private authStatusSubscription: Subscription;

  constructor(
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authStatusSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }

  onLogout() {
    this.authService.logout();
  }

}
