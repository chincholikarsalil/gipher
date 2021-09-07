import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FetchService } from 'src/app/services/fetch.service';
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

  imgUrl!: string;

  constructor(public loginService: LoginService, private fetchService: FetchService) { }

  ngOnInit() {
    document.getElementById('loginform')!.style.display = 'none';
    setTimeout(() => { document.getElementById('preloader')!.style.display = 'none'; }, 500);
    setTimeout(() => { document.getElementById('loginform')!.style.display = 'block'; }, 500);

    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.loginForm = new FormGroup({
      username: this.username,
      password: this.password
    });

    this.getLoginGif();

  }

  getLoginGif() {
    this.fetchService.searchId = "zSz2KsgySmfjbb8NJS";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );
  }

  loginSubmit() {
    this.loginService.login(this.username.value, this.loginForm.value);
  }
}