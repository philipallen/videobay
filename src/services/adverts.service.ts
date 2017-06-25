import { Injectable } from '@angular/core';

import { Advert } from '../models/advert';
import { ADVERTS } from '../mock/mock-adverts';

@Injectable()
export class AdvertsService {
	getAdverts(): Promise<Advert[]> {
		return Promise.resolve(ADVERTS)
	}
}
