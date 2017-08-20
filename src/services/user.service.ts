import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { User } from '../models/user';



@Injectable()
export class UserService {

    private baseUrl = '/api'; //use a proxy - set in ionic.config.json
    // private baseUrl = 'http://81.169.165.110:1099/videobay/api/';

    //private baseUrl = 'http://localhost:8080/videobay/api/';
    constructor(private http: Http) { }

    someoneLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    create(user: User) {
        return this.http.post(this.baseUrl + '/users', user).map((response: Response) => response.json());
    }

    getByUsernameAndPassword(user: User){
      let params: URLSearchParams = new URLSearchParams();
      params.append('username', user.screenName);
      params.set('password', user.password);
      let options : RequestOptions = new RequestOptions({search: params});

      return this.http.get(this.baseUrl + '/user' ,options).map((response: Response) => response.json())
    }
}
