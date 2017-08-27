import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class WebGuardService{

  constructor(private router: Router) { }

  canDeactivate(){
     // Check to see if a user has a valid JWT
    if (!tokenNotExpired('id_token')) {
      // If they do, return true and allow the user to load the home component
      return true;
    }

    // If not, they redirect them to the login page
    this.router.navigate(['/admin/peliculas']);
    return false;
  }

}
