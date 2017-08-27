import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers:[ AuthService ]
})
export class AdminComponent implements OnInit {

  username: string = "";

  constructor(private auth: AuthService) {
    this.username = JSON.parse(localStorage.getItem('profile')).nickname;
   }

  ngOnInit() {
  }

}
