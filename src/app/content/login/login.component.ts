import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  password!: FormControl;
  email!: FormControl;

  constructor() { }

  ngOnInit() {
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
      this.email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

      this.loginform = new FormGroup({
        password: this.password,
        email: this.email,
      });

  }

  loginSubmit() {
    console.log(this.loginform.value);
    //var email = this.loginform.get("email")?.value;
    //var password = this.loginform.get("password").value;
  }
}