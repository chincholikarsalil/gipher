import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginStatus: boolean = sessionStorage.getItem("login") == "true";
  public result: string = '';
  private username!: string;

  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return this.loginStatus;
  }

  get userInfo(): any {
    return this.http.get("http://localhost:8080/user/" + this.username, {responseType: 'json'});
  }

  setUserDetails(data: User) {
    window.sessionStorage.setItem("login", "true");
    window.sessionStorage.setItem("username", data.username);
    window.sessionStorage.setItem("name", data.name);
    window.sessionStorage.setItem("email", data.email);
    window.sessionStorage.setItem("mobileNumber", data.mobileNumber);
    window.sessionStorage.setItem("dob", data.dob);
    window.sessionStorage.setItem("joinedOn", data.joinedOn);
  }

  login(username: string, loginDetails: string) {
    this.username = username;
    this.http.post<User>("http://localhost:8080/user/login", loginDetails).subscribe(
      data => {
        if (data != null && data.username == this.username) {
          this.setUserDetails(data);
          window.location.href = "/dashboard";
        } else {
          this.result = "Wrong credentials"
          window.sessionStorage.clear();
          window.sessionStorage.setItem("login", "false");
        }
      },
      error => {
        this.result = error.error.text;
        window.sessionStorage.clear();
        window.sessionStorage.setItem("login", "false");
      }
    );
  }

  logout() {
    sessionStorage.clear();
  }

}
