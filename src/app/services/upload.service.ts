import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UploadService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  makeFileRequest(user: User, file: File, token: string, name: string): Observable<any> {
    // tslint:disable-next-line:only-arrow-functions
    const formData = new FormData();
    // tslint:disable-next-line:prefer-for-of
    const xhr = new XMLHttpRequest();
    formData.append(name, file, file.name);

    console.log(formData);
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.apiUrl + 'upload-image-user/' + user._id, formData, {headers});
  }
}
