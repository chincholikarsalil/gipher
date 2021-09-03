import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  emailId!: FormControl;
  userName!: FormControl;
  password!: FormControl;
  confirmPassword!: FormControl;
  date!: FormControl;
  mobileNumber!: FormControl;
  submitMessage!: string;

  constructor() { }

  ngOnInit() {
    this.emailId = new FormControl('', [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    this.userName = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.password = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(5)]),
    this.date = new FormControl('', Validators.required),
    this.mobileNumber = new FormControl('', Validators.required),

    this.registrationForm = new FormGroup({
      emailId: this.emailId,
      userName: this.userName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      date: this.date,
      mobileNumber: this.mobileNumber,
    });
  }

  registerSubmit() {
    console.log(this.registrationForm.value);
  }

}
