import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name: String;
    username: String;
    email: String;
    password: String;

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required fields
    if(!this.validateService.validateRegister(user)) {
      alert('Please fill in all fields.');
      return false;
    }

    // Email validation
    if(!this.validateService.validateEmail(user.email)) {
      alert('Please enter a valid email.');
      return false;
    }
  }

}
