import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) {
  }

  canActivate() {
    // Checks if a users is logged in.
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.flashMessagesService.show('Want to see your profile or dashboard? Log in!', {cssClass: 'alert-primary', timeout: 3000});
      this.router.navigate(['/login']);
      return false;
    }
  }
}
