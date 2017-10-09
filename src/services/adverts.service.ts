import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Advert } from '../models/advert';
import { ADVERTS } from '../mock/mock-adverts';

@Injectable()
export class AdvertsService {

    private baseUrl = '/api'; //use a proxy - set in ionic.config.json
	// private baseUrl = 'http://81.169.165.110:1099/videobay/api/';
	
	constructor(private http: Http) { }
	
	// getAdverts(): Promise<Advert[]> { //mock data
	// 	return Promise.resolve(ADVERTS)
	// }

	getAdverts(): Observable<any> { //real endpoint
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // let options = new RequestOptions({ headers: headers });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get('/api/adverts/countries/IRL?state=PENDING', options) //TODO this state is hardcoded to get something back from the server.
        //States are: PENDING, ACTIVE and CLOSED. Pending is just meta data for the advert. Active is when the video has been uploaded and successfully linked to the advert. Closed is when it's sold or expired or whatever.
                        .map(this.extractData)
                        .catch(this.handleError);
    } 
    
    getMyAdverts(userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get('/api/adverts/users/' + userId, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
	
	saveAdvert(data: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/adverts/byUser/' + userId, data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    } 
	
	getFavourites(userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get('/api/adverts/users/' + userId + '/favorites', options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
	
	addToFavourites(data: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/adverts/users/' + userId + '/favorites', data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    } 

    private extractData(res: Response) {
        if (res.status === 201) return {};
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
