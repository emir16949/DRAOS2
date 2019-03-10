import { City } from "./City";

export class Place {
  id?: number;
  name: string;
  description: string;
  place_url: string;
  picture: any;
  address: string;
  city: City;

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.place_url = '';
    this.picture = '';
    this.address = '';
    this.city = new City();
  }
}