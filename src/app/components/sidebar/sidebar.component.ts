import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { Stats } from '../../models/stats.model';
import { PublicationService } from '../../services/publication.service';
import { Publication } from '../../models/publication.model';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    @Output() publicationCreated = new EventEmitter();
    authenticatedUser: User;
    token: string;
    stats: Stats = new Stats(3, 3, 3);
    apiUrl = environment.apiUrl;
    status: string;
    constructor(
        private userService: UserService,
        private publicationService: PublicationService,
    ) {

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
        this.userService.authenticatedStats.subscribe(
            stats => {
                this.stats = stats;
            }
        );
        this.authenticatedUser = new User('', '', '', '', '', '', '', '');
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

    onPublish(publicationForm: NgForm) {
        const publicationValues = publicationForm.value;
        const newPublication = new Publication(null,
            publicationValues.text,
            publicationValues.file,
            null,
            this.authenticatedUser._id);
        this.publicationService.addPublication(this.token, newPublication).subscribe(
            response => {
                this.status = 'success';
                this.userService.getCounters().subscribe();
                this.publicationCreated.emit();
                publicationForm.reset();
            }, error => {
              this.status = 'error';
              console.log(error);
            });
    }
}
