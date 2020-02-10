import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class FollowService {
    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {
    }

    addFollow(token, follow): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        return this.http.post(this.apiUrl + 'follow', follow, {headers});

    }

    deleteFollow(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.delete(this.apiUrl + 'follow/' + id, {headers});
    }

    getFollowedUsers(userId: string, token: string, page: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        let url = this.apiUrl + 'following/';
        if (userId != null) {
            url = this.apiUrl + 'following/' + userId + '/' + page;
        }
        return this.http.get<{ follows: { followed, user: string }[], total, users: User[], user: User }>(url, {headers})
            .pipe(map(response => {
                const users = [];
                response.follows.forEach(
                    (follow) => {
                        // Obteniendo el usuario que sigue a los usuarios
                        // Convirtiendo en Users a nuestro resultado
                        const newUser = Object.assign(new User(), follow.followed);
                        follow.followed = newUser;
                        users.push(newUser);
                    }
                );
                response.users = users;
                return response;
            }));
    }

    getUsersFollowers(userId: string, token: string, page: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        let url = this.apiUrl + 'followed/';
        if (userId != null) {
            url = this.apiUrl + 'followed/' + userId + '/' + page;
        }
        return this.http.get<{ follows: { followed, user: string }[], total, users: User[], user: User }>(url, {headers})
            .pipe(map(response => {
                const users = [];
                response.follows.forEach(
                    (follow) => {
                        // Obteniendo el usuario que sigue a los usuarios
                        // Convirtiendo en Users a nuestro resultado
                        const newUser = Object.assign(new User(), follow.user);
                        follow.followed = newUser;
                        users.push(newUser);
                    }
                );
                response.users = users;
                return response;
            }));
    }

    getMyFollows(token): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', token);
        return this.http.get(this.apiUrl + 'get-my-follows/true', {headers});
    }

}
