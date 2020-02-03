import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';
import { UploadService } from '../../../services/upload.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements OnInit {
  public user: User;
  public token: string;
  public status: string;
  files: File;
  public url = environment.apiUrl;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private uploadService: UploadService
  ) {
  }

  ngOnInit(): void {
    this.userService.authenticatedUser.subscribe(
      user => {
        this.user = user;
      });
    this.userService.authenticatedToken.subscribe(
      token => {
        this.token = token;
      });
  }

  onUpdate(userEditForm: NgForm) {
    this.userService
      .updateUser(this.user)
      .subscribe(
        (response) => {
          if (response.user) {
            this.status = 'success';
            this.uploadService
              .makeFileRequest(response.user, this.files, this.token, 'image').subscribe(
              res => {
                this.user.image = res.user.image;
                console.log(this.user);
                this.userService.setAuthenticatedUser(this.user);
              }, error => {
                console.log(error);
              }
            );
          }
        }, (error) => {
          console.log(error);
          this.status = 'error';
        });
  }


  onUploadFile($event: any) {
    this.files = $event.target.files[0];
    console.log(this.files);
  }
}
