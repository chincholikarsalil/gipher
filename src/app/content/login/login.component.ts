import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    document.getElementById('login-form')!.style.display = 'none';
    setTimeout(() => { document.getElementById('preloader')!.style.display = 'none'; }, 500);
    setTimeout(() => { document.getElementById('login-form')!.style.display = 'block'; }, 500);

    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });

  }

  loginSubmit() {
    this.loginService.login(this.username.value, this.loginForm.value);
  }
}