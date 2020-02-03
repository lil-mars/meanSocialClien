import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  user: User;
  message: string = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {

  }

  onSignUp(registerForm: NgForm) {
    this.message = null;
    const formValues = registerForm.value;
    // Converting form to User
    this.user = new User(null,
      formValues.name,
      formValues.surname,
      formValues.nick,
      formValues.email,
      formValues.password,
      formValues.role,
      formValues.image
    );
    this.userService.signUp(formValues).subscribe(
      response => {
        if (response.user) {
          this.message = 'success';
        }
        if (response.message && response.controls) {
          this.message = response.message;
          for (const control of response.controls) {
            registerForm.controls[control].setValue(null);
          }
          this.message = 'error';
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
