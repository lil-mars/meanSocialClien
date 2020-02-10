import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication.model';


@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
    authenticatedUser: User;
    authenticatedToken: string;
    apiUrl = environment.apiUrl;
    publications: Publication[];
    page = 1;
    pages: number;

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private publicationService: PublicationService
    ) {
    }

    ngOnInit() {
        this.userService.authenticatedUser.subscribe((user) => {
            this.authenticatedUser = user;
        });
        this.userService.authenticatedToken.subscribe((token) => {
            this.authenticatedToken = token;
        });

        this.getPublications(this.page);

    }

    getPublications(page, bind = false) {
        this.publicationService.getPublications(this.authenticatedToken, page).subscribe(
            response => {
                if (!bind) {
                    this.publications = response.publications;
                } else {
                    this.publications = this.publications.concat(response.publications);
                }
                this.pages = response.pages;
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


    showMore() {
        this.getPublications(++this.page, true);
    }

    onRefresh() {
        this.page = 1;
        this.getPublications(this.page);
    }

    getImagePath(file: string) {
        return this.apiUrl + 'get-image-pub/' + file;
    }

    onDeletePublication(id: string) {
        this.publicationService.deletePublication(this.authenticatedToken, id).subscribe(
            response => {
                this.onRefresh();
            }, error => {
                console.log(error);
            }
        );

    }
}
