import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { User } from '../models/user';



@Injectable()
export class UserService {

    private baseUrl = 'http://81.169.165.110:1099/videobay/api/';

    //private baseUrl = 'http://localhost:8080/videobay/api/';
    constructor(private http: Http) { }

    someoneLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    }

    getLoggedInUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getAll() {
        return this.http.get('/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/user/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.baseUrl + 'user', user).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    getByUsernameAndPassword(user: User){
      let params: URLSearchParams = new URLSearchParams();
      params.append('username', user.screenName);
      params.set('password', user.password);
      let options : RequestOptions = new RequestOptions({search: params});

      return this.http.get(this.baseUrl + 'user' ,options).map((response: Response) => response.json())
    }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
