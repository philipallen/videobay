import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from '../models/user';
import { Address } from '../models/Address';
import { Account } from '../models/Account';

@Injectable()
export class UserService {
    // private baseUrl = '/api'; //use a proxy - set in ionic.config.json
    private baseUrl = 'http://81.169.165.110:1099/videobay/api';

    constructor(private http: Http) { }

    isSomeoneLoggedIn() {
        return JSON.parse(localStorage.getItem('currentUser')) ? true : false;
    }

    getLoggedInUser() : User {
        return JSON.parse(localStorage.getItem('currentUser')) as User;
    }

    create(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options : RequestOptions = new RequestOptions({headers: headers});
        
        return this.http.post(this.baseUrl + '/users', user, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    getByUsernameAndPassword(user: User): Observable<any>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/users?username=' + user.screenName + '&password=' + user.password, options)
                        .map((res:Response) => { 
                            this.setLoggedInUser(res); 
                            return this.extractData(res) 
                        })
                        .catch(this.handleError);
    }
    
    resetPassword(username: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/users/resetpw/?username=' + username, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }

     createAccount(address : Address) : Observable<Account>{
        let userId : number = this.getLoggedInUser().id;
        let account : Account = new Account;
        account.addresses.push(address);
        console.log(JSON.stringify(account));
        let url : string = this.baseUrl + '/users/'+userId+'/accounts';
        console.log(url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.post(url,account,options)
                        .map(this.extractData)
                        .catch(this.handleError);

    }

    public setLoggedInUser(res: Response) {
        localStorage.setItem('currentUser', JSON.stringify(res.json()));
    }

    //TODO refactor the below as it also exists in adverts.service.ts
    private extractData(res: Response) {
        if (res.status === 201) return {};
        let body = res.text().length === 0 ? '' : res.json(); 
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
