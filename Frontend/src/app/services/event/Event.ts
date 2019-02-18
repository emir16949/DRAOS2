export class Event {
  id: number;
  name: string;
  description: string;
  picture: any;
  category: {
    id: number;
  };
  place: {
    id: number;
  };
  price: number;
}