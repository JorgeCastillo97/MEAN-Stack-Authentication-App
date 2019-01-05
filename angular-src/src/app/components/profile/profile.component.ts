import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  _id: String
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      //alert("id: " + profile._id);
      this._id = profile._id;
      //alert("name:" + profile.name);
      this.name = profile.name;
      //alert("username:" + profile.username);
      this.username = profile.username;
      //alert("email:" + profile.email);
      this.email = profile.email;
      //alert("password:" + profile.password);
      this.password = profile.password;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
