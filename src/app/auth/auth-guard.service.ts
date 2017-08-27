import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(){
    // Check to see if a user has a valid JWT
    if (tokenNotExpired('id_token')) {
      // If they do, return true and allow the user to load the home component
      return true;
    }

    // If not, they redirect them to the login page
    this.router.navigate(['/auths']);
    return false;
  }
}
