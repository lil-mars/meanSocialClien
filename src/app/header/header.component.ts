import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authenticatedUser: User;
  url = environment.apiUrl;



  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    console.log('header');
    this.userService.authenticatedUser.subscribe(
      user => {
        this.authenticatedUser = user;
      });

  }

  onLogOut() {
    this.authenticatedUser = null;
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
