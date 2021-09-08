import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {

  name = sessionStorage.getItem("name");
  username = sessionStorage.getItem("username");
  mobileNumber = "+91" + sessionStorage.getItem("mobileNumber");
  dob = sessionStorage.getItem("dob");

  updateDetailsForm!: FormGroup;
  editName!: FormControl;
  editMobileNumber!: FormControl;
  editDob!: FormControl;
  editDetailsPassword!: FormControl;
  editFormUsername!: FormControl;

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.editFormUsername = new FormControl(this.username);
    this.editName = new FormControl(this.name, [Validators.required, Validators.minLength(5)]);
    this.editDetailsPassword = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.editDob = new FormControl(this.dob, Validators.required);
    this.editMobileNumber = new FormControl(this.mobileNumber.slice(3), 
      [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[0-9]{3}[0-9]{3}[0-9]{4}")]);

    this.updateDetailsForm = new FormGroup({
      username: this.editFormUsername,
      name: this.editName,
      password: this.editDetailsPassword,
      dob: this.editDob,
      mobileNumber: this.editMobileNumber
    });
  }

  updateDetails() {
    if(this.editDetailsPassword.valid) {
      this.http.post<User>("http://localhost:8080/user/edit/details", this.updateDetailsForm.value).subscribe(
        data => {
          if (data != null && data.username == this.editFormUsername.value) {
            this.loginService.setUserDetails(data);
            window.location.reload()
          }
        }
      );
    } else {
      console.log("Error!");
    }
  }
}
