import { City } from './City';
import { User } from '../user/User';

export class Place {
  id?: number;
  name: string;
  description: string;
  place_url: string;
  picture: any;
  address: string;
  city: City;
  manager: User;

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.place_url = '';
    this.picture = '';
    this.address = '';
    this.city = new City();
    this.manager = new User();
  }
}
