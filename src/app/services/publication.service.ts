import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication.model';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PublicationService {
    apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    addPublication(token: string, publication: Publication): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
        return this.http.post(this.apiUrl + 'publication', publication, {headers});
    }

    getPublications(token: string, page: number = 1): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
        return this.http
            .get<{ user: User, publications: Publication[] }>
            (this.apiUrl + 'publications/' + page, {headers})
            .pipe(map((response: { publications: Publication[] }) => {
                response.publications.forEach(publication => {
                    const publisher = new User(
                        publication.user._id,
                        publication.user.name,
                        publication.user.surname,
                        publication.user.nick,
                        publication.user.email,
                        null,
                        null,
                        publication.user.image,
                    );

                    publication.user = publisher;
                });
                return response;
            }));
    }

    deletePublication(token: string, id: string): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
        return this.http.delete(this.apiUrl + 'publication/' + id, {headers});
    }

    getUserPublications(token: string, userId: string, page = 1): Observable<any> {
        const headers = new HttpHeaders()
            .set('Authorization', token)
            .set('Content-Type', 'application/json');
        return this.http
            .get<{ user: User, publications: Publication[] }>(this.apiUrl + 'user-publications/' + userId + '/' + page,
                {headers}).pipe(map((response) => {
                    response.publications.forEach(publication => {
                        const publisher = new User(
                            publication.user._id,
                            publication.user.name,
                            publication.user.surname,
                            publication.user.nick,
                            publication.user.email,
                            null,
                            null,
                            publication.user.image,
                        );

                        publication.user = publisher;
                    });
                    return response;
                }
            ));
    }

}
