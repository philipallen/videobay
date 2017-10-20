import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from '../models/user';

@Injectable()
export class UserService {
    // private baseUrl = '/api'; //use a proxy - set in ionic.config.json
    private baseUrl = 'http://81.169.165.110:1099/videobay/api';
    //private baseUrl = 'http://localhost:8080/videobay/api/';

    constructor(private http: Http) { }

    isSomeoneLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    //TODO maybe change the below to match other http requests, such as getByUsernameAndPassword
    //This is used in register.ts
    create(user: User) {
        return this.http.post(this.baseUrl + '/users', user).map((response: Response) => response.json());
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getByUsernameAndPassword(user: User): Observable<any>{
        let params: URLSearchParams = new URLSearchParams();
        params.append('username', user.screenName.toLowerCase());
        params.set('password', user.password);
        let options : RequestOptions = new RequestOptions({search: params});

        return this.http.get(this.baseUrl + '/users' ,options)
                            .map((response: Response) => response.json())
                            .catch(this.handleError);
    }
    
    resetPassword(username: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/users/resetpw/?username=' + username, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    //TODO refactor the below as it also exists in adverts.service.ts
    private extractData(res: Response) {
        if (res.status === 201) return {};
        let body = res.json();
        return body || { };
    }
    
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.text();
            // const body = error.json() || '';
            // const err = body.error || JSON.stringify(body);
            // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}
