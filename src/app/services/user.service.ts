import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Stats } from '../models/stats.model';


export interface Error {
  message: string;
  controls: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
    this.authenticatedToken.subscribe(token => {
      this.token = token;
    });
  }

  public apiUrl: string = environment.apiUrl;
  public authenticatedUser = new BehaviorSubject<any>(null);
  public authenticatedToken = new BehaviorSubject<string>(null);
  public authenticatedStats = new BehaviorSubject<any>(null);
  public token: string;

  private static handleError(response) {
    if (response.user) {
      return response;
    }
    if (response.message) {
      let error: Error;
      if (response.message === 'Username is already in use') {
        error = {
          message: 'El usuario o contrasena ya esta registrado',
          controls: ['email', 'nick']
        };
      }
      return error;
    }
  }

  private static setLocalStorage(name, value, emitter?: Subject<any>) {
    localStorage.setItem(name, JSON.stringify(value));
    if (emitter) {
      emitter.next(value);
    }
  }

  signUp(user: User): Observable<{ user; message; controls }> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // disable tslint
    return this.http.post(this.apiUrl + 'register', user).pipe(
      // Getting error message and updating it
      map(UserService.handleError)
    );
  }

  logIn(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'login', user, {headers})
      .pipe(
        tap(response => {
          // Keep user data in the local storage (Our web navigator)
          const loggedUser = response.user;
          this.setAuthenticatedUser(loggedUser);
        })
      );
  }

  autoLogIn() {
    const userData: {
      _id: string, name: string, surname: string,
      nick: string, email: string, role: string, image: string
    } = JSON.parse(localStorage.getItem('authenticatedUser'));
    const loadedUser = new User(
      userData._id,
      userData.name,
      userData.surname,
      userData.nick,
      userData.email,
      null,
      userData.role,
      userData.image);
    const token: string = JSON.parse(localStorage.getItem('authenticatedToken'));
    if (!userData) {
      return;
    } else {
      this.authenticatedToken.next(token);
      this.authenticatedUser.next(loadedUser);
      this.getCounters().subscribe(
        response => {
          console.log(response);
        }
      );
    }
  }

  setAuthenticatedUser(user: User) {
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    const userData: {
      _id: string, name: string, surname: string,
      nick: string, email: string, role: string, image: string
    } = JSON.parse(localStorage.getItem('authenticatedUser'));
    const loadedUser = new User(
      userData._id,
      userData.name,
      userData.surname,
      userData.nick,
      userData.email,
      null,
      userData.role,
      userData.image);
    if (!userData) {
      return;
    } else {
      this.authenticatedUser.next(loadedUser);
    }
  }

  setToken(user: User): Observable<any> {
    user.gettoken = 'true';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.apiUrl + 'login', user, {headers})
      .pipe(
        tap((response) => {
          // Keep user token in the local storage (Our web navigator)
          const loggedToken = response.token;
          UserService.setLocalStorage('authenticatedToken', loggedToken, this.authenticatedToken);
        })
      );
  }

  logOut() {
    localStorage.clear();
  }

  getCounters(userId = null): Observable<any> {
    this.authenticatedToken.subscribe(token => {
      this.token = token;
    });
    const headers = new HttpHeaders().set('Content-type', 'application/json')
      .set('Authorization', this.token);
    if (userId != null) {
      return this.http.get(this.apiUrl + 'counters/' + userId, {headers})
        .pipe(
          tap((response) => {
            this.setStats(response);
          })
        );
    } else {
      console.log('we are here');
      return this.http.get(this.apiUrl + 'counters', {headers})
        .pipe(
          tap(response => {
            console.log(response);
            this.setStats(response);
          })
        );
    }
  }

  private setStats(response) {
    localStorage.setItem('stats', JSON.stringify(response));
    const sendStats: {following: number, followed: number, publications: number} = JSON.parse(localStorage.getItem('stats'));
    const stats = new Stats(sendStats.following, sendStats.followed, sendStats.publications);
    this.authenticatedStats.next(stats);
  }


  updateUser(user: User): Observable<any> {
    this.authenticatedToken.subscribe(token => {
      this.token = token;
    });

    const headers = new HttpHeaders().set('Content-type', 'application/json')
      .set('Authorization', this.token);
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json').set('Authorization', this.token);
    return this.http.put(this.apiUrl + 'update-user/' + user._id, user, {headers});
  }

  getUsers(page = null): Observable<{ users: [], pages: number, total: number, usersFollowing: [] }> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);
    return this.http.get(this.apiUrl + 'users/' + page, {headers})
      .pipe(map((response: { users: [], pages: number, total: number, usersFollowing: [] }) => {
        const users: any = [];
        response.users.forEach((user: User) => {
          users.push(new User(
            user._id,
            user.name,
            user.surname,
            user.nick,
            user.email,
            user.password,
            user.role,
            user.image
          ));
        });
        response.users = users;
        return response;
      }));
  }
}
