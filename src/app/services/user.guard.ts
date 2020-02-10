import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {
    }

    canActivate() {
        let authenticatedUser;
        this.userService.authenticatedUser.subscribe(
            user => {
                authenticatedUser = user;
            }
        );
        if (authenticatedUser) {
            console.log(authenticatedUser);
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
