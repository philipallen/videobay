import { User } from "./user";

export class Advert {
    title: string;
    description: string;
    price: number;
    country: string;
    videoUrl: string;
    created: number;
    county: string;
    id?: number;
    state?: string;
    user?: User; //to be more strongly typed later
    city?: string;
}
//todo eventually sync this up with the rest endpoints types
