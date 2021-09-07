import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  email!: FormControl;
  username!: FormControl;
  name!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  dob!: FormControl;
  mobileNumber!: FormControl;
  joinedOn!: FormControl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    document.getElementById('register')!.style.display = 'none';
    setTimeout(() => { document.getElementById('preloader')!.style.display = 'none'; }, 500);
    setTimeout(() => { document.getElementById('register')!.style.display = 'block'; }, 500);

    this.email = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$")]);
    this.username = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.name = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.dob = new FormControl('', Validators.required);
    this.mobileNumber = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{3}[0-9]{3}[0-9]{4}")]);
    this.joinedOn = new FormControl(Date.now().toString());

    this.registrationForm = new FormGroup({
      email: this.email,
      username: this.username,
      name: this.name,
      password: this.password,
      dob: this.dob,
      mobileNumber: this.mobileNumber,
      joinedOn: this.joinedOn
    });

  }

  registerSubmit() {
    if(this.confirmPassword.value === this.password.value) {
      console.log(JSON.stringify(this.registrationForm.value));
      this.http.post<string>("http://localhost:8080/user/register", this.registrationForm.value).subscribe();
      window.location.href = "/login";
    } else {
      console.log("Error!");
    }
  }

}
