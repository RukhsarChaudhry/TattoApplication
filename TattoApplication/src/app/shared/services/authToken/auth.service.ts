import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { AuthToken, Credentials } from '../../entities/index';

@Injectable()
export class AuthTokenService {
    private session = new ReplaySubject<any>(1);
    sessionEvent$ = this.session.asObservable();
    authenticated: any;
    constructor(public http: Http) {
        this.session.subscribe(data => {
            console.log(data);
        })
    }
    public signIn(credentials: Credentials): Observable<any> {
        let user = {
            'user': {
                'email': credentials.email,
                'password': credentials.password
            }
        }
        return this.http.post("https://tatto.herokuapp.com/api/users/authenticate", user, "application/x-www-form-urlencoded")
            .map(user => {
                let data = user.json();
                if (data.user.token) {
                    localStorage.setItem('currentUser', data.user.token);
                    this.authenticated = localStorage.setItem('status', 'true');
                }

                return user;
            });

    }
    hasToken() {
        return this.session.next(true);
    }
    logout(): Observable<any> {
        localStorage.setItem('status', 'false');
        localStorage.removeItem('currentUser');
        return JSON.parse('true');
    }
}