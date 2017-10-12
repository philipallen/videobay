import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { User } from '../models/user';

@Injectable()
export class UserService {
    private baseUrl = '/api'; //use a proxy - set in ionic.config.json
    // private baseUrl = 'http://81.169.165.110:1099/videobay/api/';
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
        //TODO show a message confirming log out?
    }

    getByUsernameAndPassword(user: User): Observable<any>{
        let params: URLSearchParams = new URLSearchParams();
        params.append('username', user.screenName);
        params.set('password', user.password);
        let options : RequestOptions = new RequestOptions({search: params});

        return this.http.get(this.baseUrl + '/users' ,options)
                            .map((response: Response) => response.json())
                            .catch(this.handleError);
    }
    
    //TODO refactor the below as it also exists in adverts.service.ts
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
