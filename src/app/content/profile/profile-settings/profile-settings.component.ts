import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  imageSrc: string = '../../favicon.ico';
  imageUpload = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  name = sessionStorage.getItem("name");
  username = "@" + sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  mobileNumber = "+91" + sessionStorage.getItem("mobileNumber");
  dob = sessionStorage.getItem("dob");
  joinedOn = sessionStorage.getItem("joinedOn");

  editName = '';
  editPhone = '';
  editDob = '';
  editEmail = '';

  constructor(private http: HttpClient, private loginService: LoginService) {
    if (!this.loginService.isLoggedIn()) {
      window.location.href = "/login";
    }
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem(window.sessionStorage.getItem("query")!.toString());
  }

  deleteUser() {
    let delPwd = prompt("Confirm your password to delete your profile");
    this.http.post<string>("http://localhost:8080/user/delete", JSON.stringify({ "username": sessionStorage.getItem("username"), "delPwd": delPwd })).subscribe(
      data => console.log(data),
      error => {
        alert(error.error.text)
        if (error.error.text == "User deleted!") {
          window.sessionStorage.clear();
          window.location.href = "/login";
        }
      }
    );
  }

  uploadPhoto() {
    console.log("upload");
  }

  get f() {
    return this.imageUpload.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.imageUpload.patchValue({
          fileSource: reader.result
        });

      };

    }
  }

  submit() {
    console.log(this.imageUpload.value);
    this.http.post('http://localhost:8001/upload.php', this.imageUpload.value).subscribe(
      res => {
        console.log(res);
        alert('Uploaded Successfully.');
      }
    );
  }

}
