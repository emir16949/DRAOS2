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

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.picture = null;
    this.category = new Category;
    this.place = new Place;
    this.price = 0;
  }
}
