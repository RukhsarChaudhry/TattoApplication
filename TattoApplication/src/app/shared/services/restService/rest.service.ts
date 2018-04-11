import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class RESTConnectorService {
    Url: any = "https://tatto.herokuapp.com/api/";
    constructor(public http: Http) { }



    private handleError(error: any, blocking: Boolean) {
        //let body = error.json();
        if (blocking) {
        }
        return Observable.throw(error);
    }


    parseResponse(res: any) {
        console.log(res);
        let body = res.json();
    }

    // private getHeader(contentType: string, isSecure: boolean): Headers {
    //     const headers = new Headers();
    //     headers.append("Content-Type", contentType);
    //     // headers.append('Access-Control-Allow-Origin', '*');
    //     // headers.append('Access-Control-Allow-Origin', 'GET, POST, PATCH, PUT, DELETE');
    //     if (isSecure) {
    //         let token = this.authTokenService.getToken();
    //         if (token) {
    //             headers.append("Authorization", `Bearer ${token.access_token}`);
    //         }
    //     }
    //     return headers;
    // }


    httpPostWeb(obj: any, url: any, contentType: string = 'application/json') {
        url = this.Url + url;
        let body = (contentType == 'application/json') ? JSON.stringify(obj) : obj;
        let headers = new Headers();
        headers.append("Content-Type", contentType);
        const options = new RequestOptions({ headers: headers });
        return this.http.post(url, obj, options)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);
    }
    httpPostSecureWeb(obj: any, url: any, contentType: string = 'application/json') {
        url = this.Url + url;
        let body = obj;
        return this.http.post(url, body)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);
    }
    httpPutWeb(obj: any, url: any, contentType: string = 'application/json') {
        url = this.Url + url;
        let body =  obj;
        return this.http.patch(url, body)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);
    }
    httpGetSecureWeb(url: any, contentType: string = 'application/json') {
        url = this.Url + url;
        return this.http.get(url)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);

    }
    httpDeleteSecureWeb(url: any,  contentType: string = 'application/json') {
        url = this.Url + url;
        return this.http.delete(url)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);
    }
    httpDelete() {
        return this.http.delete(this.Url)
            .map((data => {
                return data.json();
            }))._catch(res => res.json);

    }


}