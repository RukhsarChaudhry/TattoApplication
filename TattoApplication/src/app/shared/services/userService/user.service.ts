import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs';
import { User, AuthToken, Credentials } from './../../entities/index';
import { RESTConnectorService } from './../RestService/index';


@Injectable()

export class UserService {
    IsUserLoggedIn: Subject<boolean> = new Subject<boolean>();
    constructor(public restService: RESTConnectorService, private http: Http) { }

    public getUserInfo(): Observable<User> {
        let url = "api/Account/GetUserInfo";
        return
    }
    RegisterUser(values: any): Observable<any> {
        let user = {
            'user': {
                'first_name': values.first_name,
                'last_name': values.last_name,
                'email': values.email,
                'password': values.password
            }
        }
        let url = "users/register";
        return this.restService.httpPostWeb(user, url);

    }
    ResetPassword(values: any): Observable<any> {
        let user = {
            'user': {
                'email': values.email,
            }
        }
        let url = "users/reset_password";
        return this.restService.httpPostSecureWeb(user, url);
    }

}