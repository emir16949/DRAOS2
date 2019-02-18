import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { PlaceService } from '../services/place/place.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  event: Event = {
    id: null,
    name: '',
    description: '',
    picture: '',
    category: {
      id: null
    },
    place: {
      id: null
    },
    price: 0,
  };

  categories: Array<any>;
  places: Array<any>;
  odabranaCategory: any;
  odabraniPlace: any;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private placeService: PlaceService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
    });
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });

  }

  loadajStranicu() {
    window.location.reload();
  }

  kreirajEvent() {
    this.event.category.id = this.odabranaCategory;
    this.event.place.id = this.odabraniPlace;
    this.eventService.createEvent(this.event).subscribe();
  }

  zatvori() {
    this.event.name = '';
    this.event.description = '';
    this.event.place.id = null;
    this.event.category.id = null;
    this.odabranaCategory = null;
    this.odabraniPlace = null;
  }
}
