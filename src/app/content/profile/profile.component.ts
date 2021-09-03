import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName='nisha';
  userEmailId='nisha.hm@gmail.com';
  emailId='nisha.hm@gmail.com';
  mobileNumber='7892259334';
  date='24/08/1998';

  constructor() { }

  ngOnInit(): void {
  }
  editProfile(){
    window.location.href = "http://localhost:4200/profile/settings";
  }
  deleteUser(){
    console.log("delete");
  }
  uploadPhoto(){
    console.log("upload");
  }

}
 
