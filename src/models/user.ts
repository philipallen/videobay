import { Advert } from '../models/advert';

export class User {
    id: number;
    screenName: string;
    password: string;
    firstName: string;
    surName: string;
    email: string;
    adverts: Advert[];
}
//todo eventually sync this up with the rest endpoints types