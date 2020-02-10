import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { Follow } from '../../../models/follow.model';
import { FollowService } from '../../../services/follow.service';
import { Stats } from '../../../models/stats.model';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user: User;
    token: string;
    apiUrl = environment.apiUrl;
    stats: Stats;
    following = false;
    followed = false;
    authenticatedUser: User;
    userId: string;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private followService: FollowService
    ) {
    }

    ngOnInit() {

        this.userService.authenticatedUser.subscribe((user) => {
            this.authenticatedUser = user;
        });
        this.userService.authenticatedToken.subscribe((token) => {
            this.token = token;
        });
        this.user = new User('', '', '', '', '', '', '', '');
        this.route.params.subscribe((params: Params) => {
            this.userId = params.id;
            this.setStats();
            this.userService.getUser(this.userId, this.token).subscribe((response) => {
                this.user = response.user;
                this.checkFollow(response);
            });
        });
    }

    checkFollow(response) {
        this.following = response.following && response.following._id ? true : false;
        this.followed = response.followed && response.followed._id ? true : false;
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

    onFollowUser(followed) {
        const follow = new Follow('', this.authenticatedUser._id, followed);
        this.followService.addFollow(this.token, follow).subscribe(
            response => {
                this.userService.getCounters().subscribe();
                this.setStats();
                this.following = true;
            }, error => {
                console.log(error);
            }
        );
    }

    setStats() {
        this.userService.getCounters(this.userId).subscribe(stats => {
            this.stats = stats;
        });
    }

    onUnFollowUser(followed) {
        this.followService.deleteFollow(this.token, followed).subscribe(
            response => {
                this.userService.getCounters().subscribe();
                this.setStats();
                this.following = false;
            }, error => {
                console.log(error);
            }
        );
    }


}
