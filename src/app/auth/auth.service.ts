import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = environment.baseUrl;
  private token: string;
  private userId: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  getIsAuth() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  register(data) {
    this.http.post<{ id: string, token: string }>(this.url + '/api/users/register', data)
      .subscribe(result => {
        this.authenticate(result);
      }, err => {
        console.log(err.error.errors);
      })
  }

  login(data) {
    this.http.post<{ id: string, token: string }>(this.url + '/api/users/login', data)
      .subscribe(result => {
        this.authenticate(result);
      }, err => {
        console.log(err.error.errors);
      })
  }

  autoAuth() {
    const authInformation = this.getAuthData();

    if (!authInformation) {
      return;
    }

    this.token = authInformation.token;
    this.userId = authInformation.userId;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.userId = null;
    this.authStatusListener.next(false);
    this.clearUserData();
    this.router.navigate(['/signin']);
  }

  private authenticate(result) {
    const token = result.token;
    this.token = token;

    if (token) {
      this.isAuthenticated = true;
      this.userId = result.id;
      this.authStatusListener.next(true);
      this.saveAuthData(this.token, this.userId);
      this.router.navigate(['/']);
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      return;
    }

    return {
      token,
      userId
    }
  }

  private saveAuthData(token: string, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }

  private clearUserData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
}
