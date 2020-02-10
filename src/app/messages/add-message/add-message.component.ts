import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';
import { MessagesService } from '../../services/messages.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { Message } from '../../models/message.model';

@Component({
    selector: 'app-add-message',
    templateUrl: './add-message.component.html',
    styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
    authenticatedUser: User;
    token: string;

    apiUrl = environment.apiUrl;
    status: string;
    message: Message;
    follows: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private followService: FollowService,
        private messagesService: MessagesService,
        private userService: UserService
    ) {
        this.authenticatedUser = null;
        this.userService.authenticatedUser.subscribe(
            user => {
                this.authenticatedUser = user;
            }
        );

        this.userService.authenticatedToken.subscribe(
            token => {
                this.token = token;
            }
        );
        this.message = new Message(null,
            null,
            null,
            null,
            this.authenticatedUser._id,
            null);

    }

    ngOnInit() {

        this.getMyFollows();
    }

    getMyFollows() {
        this.followService.getMyFollows(this.token).subscribe(
            response => {
                this.follows = response.follows;
            }, err => {
                console.log(err);
            }
        );
    }

    onSend(messageForm: NgForm) {
        this.messagesService.addMessage(this.token, this.message).subscribe(
            response => {
                this.status = 'success';
                console.log(response);
                messageForm.reset();
            }, err => {
                this.status = 'error';
                console.log(err);
            }
        );
    }
}
