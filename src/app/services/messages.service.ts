import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class MessagesService {
    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    addMessage(token, message) {
        const headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'message', message, {headers});
    }

    getReceivedMessages(token, page = 1) {
        const headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
        return this.http.get<{
            pages: number;
            messages: { emitter: User }
        }>(this.apiUrl + 'my-messages/' + page, {headers});
    }

    getEmittedMessages(token, page = 1) {
        const headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
        return this.http.get<{
            pages: number;
            messages: { emitter: User }
        }>(this.apiUrl + 'messages/' + page, {headers});
    }


}
