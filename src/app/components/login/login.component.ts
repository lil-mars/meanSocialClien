import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  title: string;
  status: string;
  authenticatedUser: {};
  token: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {

  }

  onLogIn(loginForm: NgForm) {
    // Log in the user and keep their data
    const formValues = loginForm.value;
    // Get user data
    this.userService.logIn(formValues).subscribe(
      response => {
        if (response.user) {
          this.authenticatedUser = response.user;
          this.status = 'success';
          // Get user token
          this.setToken(formValues);
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  setToken(user: User) {
    this.userService.setToken(user).subscribe(
      response => {
        // Keep user token in the local storage (Our web navigator )
        if (response.token) {
          this.token = response.token;
          this.getCounters();
        } else {
          this.status = 'error';
        }
      }, error => {
        this.status = 'error';
        console.log(error);
      }
    );
  }

  getCounters() {
    this.userService.getCounters().subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
      }
    );
  }
}
