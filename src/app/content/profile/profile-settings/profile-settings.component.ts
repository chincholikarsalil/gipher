import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';
import { UserPicture } from 'src/app/user';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit {

  name = sessionStorage.getItem("name");
  username = "@" + sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  mobileNumber = "+91" + sessionStorage.getItem("mobileNumber");
  dob = sessionStorage.getItem("dob");

  imgUrl!: string;
  faUser = faUser;

  imageSrc: string = '';
  imageUpload = new FormGroup({
    username: new FormControl(this.username.slice(1)),
    name: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private loginService: LoginService, private fetchService: FetchService) {
    if (!this.loginService.isLoggedIn()) {
      window.location.href = "/login";
    }
    if(window.sessionStorage.getItem("userPicture"))
      this.imageSrc = window.sessionStorage.getItem("userPicture")!.toString();
  }

  ngOnInit(): void {
    window.localStorage.removeItem(window.localStorage.getItem("query")!.toString());
    this.getEditProfileGif();
  }

  getEditProfileGif() {
    this.fetchService.searchId = "tcEfhbX3fVUTxhbPBL";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );
  }

  deleteUser() {
    let delPwd = prompt("Confirm your password to delete your profile");
    this.http.post<string>("http://localhost:8080/user/delete", JSON.stringify({ "username": this.username.slice(1), "delPwd": delPwd })).subscribe(
      error => console.log(error),
      data => {
        alert(data.error.text)
        if (data.error.text == "User deleted!") {
          window.sessionStorage.clear();
          window.location.href = "/login";
        }
      }
    );
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
          name: file.name,
          image: reader.result
        });

      };

    }
  }

  submit() {
    console.log(this.imageUpload.value)
    this.http.post<UserPicture>('http://localhost:8080/user/edit/picture', this.imageUpload.value).subscribe(
      data => {
        window.sessionStorage.setItem("userPicture", data.image);
        alert('Uploaded Successfully.');
        window.location.reload();
      }
    );
  }

}
