import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

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

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

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
      this.flashMessagesService.show('Please fill in all fields.', {cssClass: 'alert-danger'});
      return false;
    }

    // Email validation
    if(!this.validateService.validateEmail(user.email)) {
      this.flashMessagesService.show('Please enter a valid email.', {cssClass: 'alert-danger'});
      return false;
    }

    // Registers a user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show('You are now registered!', {cssClass: 'alert-success', timeout: 3000});
        // Redirects to the login component.
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show('Something went wrong.', {cssClass: 'alert-danger', timeout: 3000});
        // 'Redirects' to the same page to try again.
        this.router.navigate(['/register']);
      }
    });
  }
}
