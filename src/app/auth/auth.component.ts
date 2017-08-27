import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers:[AuthService]
})
export class AuthComponent implements OnInit {

  constructor(private auth: AuthService) {
   }

  ngOnInit() {
     
  }

  login(){
    this.auth.login();
  }

  logout(){
    this.auth.logout();
  }

  isLogged(){
    return this.auth.loggedIn();
  }

}
