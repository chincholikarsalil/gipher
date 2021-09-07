import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FetchService } from 'src/app/services/fetch.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageSrc: string = '../favicon.ico';
  imageUpload = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  name = sessionStorage.getItem("name");
  username = "@" + sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  mobileNumber = "+91-" + sessionStorage.getItem("mobileNumber");
  dob = sessionStorage.getItem("dob");
  joinedOn = sessionStorage.getItem("joinedOn");

  imgUrl!: string;

  constructor(private fetchService: FetchService, private loginService: LoginService) {
    if (!this.loginService.isLoggedIn()) {
      window.location.href = "/login";
    }
    if(window.sessionStorage.getItem("userPicture"))
      this.imageSrc = window.sessionStorage.getItem("userPicture")!.toString();
  }

  ngOnInit(): void {
    window.localStorage.removeItem(window.localStorage.getItem("query")!.toString());
    this.getProfileGif();
  }

  getProfileGif() {
    this.fetchService.searchId = "GnnJHpHmG5VEQAheZi";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );
  }

  editProfile() {
    window.location.href = "http://localhost:4200/profile/settings";
  }

}

