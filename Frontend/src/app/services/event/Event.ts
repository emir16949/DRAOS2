import { Category } from '../category/Category';
import { Place } from '../place/Place';

export class Event {
  id: number;
  name: string;
  description: string;
  picture: any;
  category: Category;
  place: Place;
  price: number;
  date_time: Date;

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.picture = null;
    this.category = new Category;
    this.place = new Place;
    this.price = 0;
    this.date_time = new Date();
  }
}
