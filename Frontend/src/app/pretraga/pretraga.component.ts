import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../services/category/Category';
import { CategoryService } from '../services/category/category.service';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { City } from '../services/place/City';
import { CityService } from '../services/place/city.service';
import { Place } from '../services/place/Place';
import { PlaceService } from '../services/place/place.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  searchedEvents: Set<Event>;
  events: Array<Event>;
  categories: Array<Category>;
  places: Array<Place>;
  cities: Array<City>;
  modal_naziv: any;
  findByEvent: any;
  findByPlace: any;
  selectedCity = null;
  selectedPlace = null;
  selectedCategory = null;

  constructor(
    private router: Router,
    private eventService: EventService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private cityService: CityService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
    });
    this.eventService.getAllEvents().subscribe(data => {
      this.events = data;
    });
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  pretraziEvente() {
    this.searchedEvents = new Set<Event>();
    this.events.forEach(element => { this.searchedEvents.add(element); });
    if (this.selectedCategory) {
      this.searchedEvents.forEach(element => {
        if (element.category.id != this.selectedCategory) {
          this.searchedEvents.delete(element);
        }
      });
    }
    if (this.selectedCity) {
      this.searchedEvents.forEach(element => {
        if (element.place.city.id != this.selectedCity) {
          this.searchedEvents.delete(element);
        }
      });
    }
    if (this.selectedPlace) {
      this.searchedEvents.forEach(element => {
        if (element.place.id != this.selectedPlace) {
          this.searchedEvents.delete(element);
        }
      });
    }
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      console.log('berina');
      // this.prijaviSe();
    }
  }

  prikaziDetalje(event: any) {
    this.router.navigate(['/detalji-eventa', event.id]);
  }
}
