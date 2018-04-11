import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AuthToken, Credentials } from '../../entities/index';
import { RESTConnectorService } from './../RestService/index';

@Injectable()
export class AuthTokenService {
    userEvent$: ReplaySubject<boolean> = new ReplaySubject(1);
    isAuthenticated: boolean = false;
    constructor(public http: Http,
        public restService: RESTConnectorService) {
        this.notify();
    }
    public signIn(credentials: Credentials): Observable<any> {
        let user = {
            'user': {
                'email': credentials.email,
                'password': credentials.password
            }
        }
        return this.http.post("https://tatto.herokuapp.com/api/sessions", user, "application/x-www-form-urlencoded")
            .map(user => {
                let data = user.json();
                if (data.user.token) {
                    localStorage.setItem('currentUser', data.user.token);
                    localStorage.setItem('status', 'true');
                    this.isAuthenticated = JSON.parse(localStorage.getItem('status'));
                    this.notify();
                }

                return user;
            });

    }
    RegisterUser(values: any): Observable<any> {
        let user = {
            'user': {
                'first_name': values.first_name,
                'last_name': values.last_name,
                'username': values.username,
                'email': values.email,
                'password': values.password
            }
        }
        return this.http.post("https://tatto.herokuapp.com/api/users/register", user)
            .map(user => {
                let data = user.json();
                if (data.user.token) {
                    localStorage.setItem('currentUser', data.user.token);
                    localStorage.setItem('status', 'true');
                    this.isAuthenticated = JSON.parse(localStorage.getItem('status'));
                    this.notify();
                }

                return user;
            });
    }
    logout() {
        localStorage.removeItem('currentUser')
        localStorage.setItem('status', 'false');
        this.isAuthenticated = JSON.parse(localStorage.getItem('status'));
        this.notify();
    }
    private notify() {
        this.userEvent$.next(this.isAuthenticated);
    }
}