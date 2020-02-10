import { Component, Input, OnInit } from '@angular/core';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication.model';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-publication',
    templateUrl: './publication.component.html',
    styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
    apiUrl = environment.apiUrl;
    @Input() userId: string;
    @Input() token: string;
    page = 1;
    pages: number;
    publications: Publication[];

    constructor(
        private publicationService: PublicationService
    ) {
    }

    ngOnInit() {
        this.getPublications(this.page);
    }

    getPublications(page, bind = false) {
        this.publicationService.getUserPublications(this.token, this.userId, page).subscribe(
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

    showMore() {
        this.getPublications(++this.page, true);
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


    getImagePath(file: string) {
        return this.apiUrl + 'get-image-pub/' + file;
    }
}
