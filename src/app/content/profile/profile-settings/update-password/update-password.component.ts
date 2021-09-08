import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  username = sessionStorage.getItem("username");

  editFormUsername!: FormControl;
  updatePasswordForm!: FormGroup;
  currentPassword!: FormControl;
  newPassword!: FormControl;
  confirmNewPassword!: FormControl;

  constructor(private loginService: LoginService, private http: HttpClient) { }

  ngOnInit(): void {
    this.editFormUsername = new FormControl(this.username);
    this.currentPassword = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.newPassword = new FormControl('', [Validators.required, Validators.minLength(5)]);
    this.confirmNewPassword = new FormControl('', [Validators.required, Validators.minLength(5)]);

    this.updatePasswordForm = new FormGroup({
      username: this.editFormUsername,
      password: this.currentPassword,
      newPassword: this.newPassword
    });
  }

  updatePassword() {
    if(this.updatePasswordForm.valid) {
      this.http.post<User>("http://localhost:8080/user/edit/password", this.updatePasswordForm.value).subscribe(
        data => {
          if (data != null && data.username == this.editFormUsername.value) {
            alert("Password changed! You will need to login again.")
            window.sessionStorage.clear();
            window.location.reload();
          }
        }
      );
    } else {
      console.log("Error!");
    }
  }

}
