import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';


declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  lock = new Auth0Lock('-TjMbOCPa3wCj0YeF-I62Iq3WcV8iUVo', 'filmsplay.auth0.com',{});

  constructor(private router: Router) {
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
    });
  }

  login() {
   this.lock.show((error: string, profile: Object, id_token: string) => {
     if (error) {
       console.log(error);
     }
     // We get a profile object for the user from Auth0
     localStorage.setItem('profile', JSON.stringify(profile));
     // We also get the user's JWT
     localStorage.setItem('id_token', id_token);

     this.router.navigateByUrl('/admin');
    });     
  }

  logout() {
    // To log out, we just need to remove
    // the user's profile and token
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    
     this.router.navigateByUrl('/auths');    
  }

  loggedIn(): boolean{
    return tokenNotExpired('id_token');
  }

}