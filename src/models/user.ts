import { Advert } from '../models/advert';
import { Account } from './Account';

export class User {
    id: number;
    screenName: string;
    password: string;
    firstName: string;
    surName: string;
    email: string;
    account : Account;
    adverts: Advert[];
    favoriteAds: number[];
}
//todo eventually sync this up with the rest endpoints types
