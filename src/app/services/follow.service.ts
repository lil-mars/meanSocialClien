import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
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
}
