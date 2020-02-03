import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { FollowService } from '../../../services/follow.service';
import { Follow } from '../../../models/follow.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  title: string;
  authenticatedUser: User;
  token: string;

  page: number;
  previousPage: number;
  nextPage: number;

  url = environment.apiUrl;
  total: number;
  pages: number;
  users: User[];
  follows: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private followService: FollowService
  ) {
  }

  ngOnInit(): void {
    this.userService.authenticatedToken.subscribe(token => this.token = token);
    this.userService.authenticatedUser.subscribe(user => this.authenticatedUser = user);
    this.actualPage();
  }

  actualPage() {
    this.route.params.subscribe(params => {
      this.page = +params.page;
      if (!params.page || this.page <= 0) {
        this.router.navigate(['/people', '1']);
      }
      this.previousPage = this.page - 1;
      this.nextPage = this.page + 1;
      this.getUsers(this.page);
    });
  }

  getUsers(page) {
    this.userService.getUsers(this.page).subscribe(
      response => {
        this.total = response.total;
        this.users = response.users;
        this.pages = response.pages;
        this.follows = response.usersFollowing;
        if (this.page > this.pages) {
          this.router.navigate(['..'], {relativeTo: this.route});
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getPathImage(userImage) {
    let path;
    if (userImage) {
      path = this.url + 'get-image-user/' + userImage;
    } else {
      path = this.url + 'get-image-user/' + 'no-photo.png';
    }
    return path;
  }

  // tslint:disable-next-line:variable-name
  enableAddFollow(id: string) {
    if (this.follows.indexOf(id) === -1) {
      return true;
    }
    return false;
  }

  onFollowUser(followed) {
    const follow = new Follow('', this.authenticatedUser._id, followed);
    this.followService.addFollow(this.token, follow).subscribe(
      response => {
        console.log(response);
        this.userService.getCounters().subscribe();
        this.follows.push(followed);
      }, error => {
        console.log(error);
      }
    );
  }

  onUnFollowUser(followed) {
    this.followService.deleteFollow(this.token, followed).subscribe(
      response => {
        const search = this.follows.indexOf(followed);
        if (search !== -1) {
          this.follows.splice(search, 1);
          this.userService.getCounters().subscribe();
        }
      }, error => {
        console.log(error);
      }
    );
  }

  enableDeleteFollow(id: string) {
    if (this.follows.indexOf(id) >= 0) {
      return true;
    }
    return false;
  }
}



