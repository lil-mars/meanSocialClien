import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { Follow } from '../../models/follow.model';

@Component({
    selector: 'app-followed',
    templateUrl: './followed.component.html',
    styleUrls: ['./followed.component.css']
})
export class FollowedComponent implements OnInit {
    page: number;
    token: string;
    authenticatedUser: User;
    previousPage: number;
    nextPage: number;
    user: User;
    apiUrl = environment.apiUrl;

    total: number;
    pages: number;
    users: User[];
    follows: string[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private followService: FollowService,
    ) {
    }

    ngOnInit(): void {
        this.userService.authenticatedToken.subscribe(token => this.token = token);
        this.userService.authenticatedUser.subscribe(user => this.authenticatedUser = user);
        this.actualPage();
    }

    actualPage() {
        this.route.params.subscribe(params => {
            const userId = params.id;
            this.page = +params.page;
            if (!params.page) {
                this.page = 1;
            }
            this.previousPage = this.page - 1;
            this.nextPage = this.page + 1;
            this.getUser(userId);
        });
    }

    getUser(userId) {
        this.userService.getUser(userId, this.token).subscribe(
            res => {
                console.log(res);
                this.user = res.user;
                this.getFollowedUsers(userId);
            }, err => {
                console.log(err);
                this.router.navigate(['/home']);
            }
        );
    }

    getFollowedUsers(userId) {
        this.followService.getUsersFollowers(userId, this.token, this.page).subscribe(
            response => {
                this.pages = response.pages;
                this.users = response.users;
                console.log(response);
            }, error => {
                console.log(error);
            }
        );
    }

    getPathImage(userImage) {
        let path;
        if (userImage) {
            path = this.apiUrl + 'get-image-user/' + userImage;
        } else {
            path = this.apiUrl + 'get-image-user/' + 'no-photo.png';
        }
        return path;
    }

}
