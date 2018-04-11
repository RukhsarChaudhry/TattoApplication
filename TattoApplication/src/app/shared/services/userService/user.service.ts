import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable, Subject } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User, AuthToken, Credentials } from './../../entities/index';
import { RESTConnectorService } from './../RestService/index';


@Injectable()

export class UserService {
    constructor(public restService: RESTConnectorService, private http: Http) {
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