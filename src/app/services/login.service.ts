import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStatus: boolean

  constructor() {
    this.loginStatus = localStorage.getItem("Login") == "true";
  }

  isLoggedIn() {
    return this.loginStatus;
  }

  login() {
    localStorage.setItem("Login", "true");
  }

  logout() {
    localStorage.setItem("Login", "false");
  }

}
