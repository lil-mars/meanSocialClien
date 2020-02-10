import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';
import { MessagesService } from '../../services/messages.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

import { Message } from '../../models/message.model';

@Component({
    selector: 'app-sended-messages',
    templateUrl: './sended-messages.component.html',
    styleUrls: ['./sended-messages.component.css']
})
export class SendedMessagesComponent implements OnInit {
    authenticatedUser: User;
    token: string;

    apiUrl = environment.apiUrl;
    status: string;
    message: Message;
    follows: any;
    messages: any;
    pages: number;
    users: User[];
    page: number;
    previousPage: number;
    nextPage: number;

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
            this.getMessages(this.page);
        });
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

    ngOnInit() {
        this.actualPage();
    }

    getMessages(page) {
        this.messagesService.getEmittedMessages(this.token, page).subscribe(
            response => {
                this.messages = response.messages;
                this.pages = response.pages;
                console.log(response);
            }, error => {
                console.log(error);
            }
        );
    }
}
