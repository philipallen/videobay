import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import { Advert } from '../models/advert';
// import { ADVERTS } from '../mock/mock-adverts';

@Injectable()
export class AdvertsService {

    // private baseUrl = '/api'; //use a proxy - set in ionic.config.json
	private baseUrl = 'http://81.169.165.110:1099/videobay/api';
	
	constructor(private http: Http) { }
    
    /* MOCK DATA (comment this back in and the below getAdverts out to see mock data) */
	// getAdvertsByCountryAndState(): Promise<Advert[]> { 
	// 	return Promise.resolve(ADVERTS)
	// }

	getAdvertsByCountryAndState(county: string, state: string): Observable<any> { //real endpoint
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/adverts/countries/' + county + '?state=' + state, options)
        //States are: [CLOSE, OPEN, PENDING]. Pending is just meta data for the advert. Active is when the video has been uploaded and successfully linked to the advert. Closed is when it's sold or expired or whatever.
                        .map(this.extractData)
                        .catch(this.handleError);
    }

    updateAdvertsForUser(data: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.put(this.baseUrl + '/adverts/users/' + userId, data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    getAdvertsByUser(userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/adverts/users/' + userId, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
	
	addAdvertByUser(data: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/adverts/byUser/' + userId, data, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
	
	getFavourites(userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
		let options : RequestOptions = new RequestOptions({headers: headers});

        return this.http.get(this.baseUrl + '/adverts/users/' + userId + '/favorites', options)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
	
	addToFavourites(advertId: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.baseUrl + '/adverts/users/' + userId + '/favorites', advertId, options)
                        .map(this.extractData)
                        .catch(this.handleError);
    } 
	
	removeFromFavourites(advertId: any, userId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, body: advertId });

        return this.http.delete(this.baseUrl + '/adverts/users/' + userId + '/favorites', options)
                        .map(this.extractData)
                        .catch(this.handleError);
    } 

    private extractData(res: Response) { //todo refactor as in user.service too
        // if (res.status === 201) return {};
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
