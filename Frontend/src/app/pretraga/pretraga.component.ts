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
  placesForDropDown: Array<Place>;
  cities: Array<City>;
  modal_naziv: any;
  findByEvent: any;
  findByPlace: any;
  selectedCity = 0;
  selectedPlace = 0;
  selectedCategory = 0;
  selectedName = null;
  selectedDate = null;

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
      this.placesForDropDown = data;
    });
    this.cityService.getAllCities().subscribe(data => {
      this.cities = data;
    });
    // this.searchedEvents = new Set<Event>();
    // this.events.forEach(element => { this.searchedEvents.add(element); });
  }

  pretraziEvente() {
    this.searchedEvents = new Set<Event>();
    this.events.forEach(element => { this.searchedEvents.add(element); });

    if (this.selectedCategory != 0) {
      this.searchedEvents.forEach(element => {
        if (element.category.id != this.selectedCategory) {
          this.searchedEvents.delete(element);
        }
      });
    }
    if (this.selectedCity != 0) {
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
    if (this.selectedName !== null) {
      const names = this.selectedName.split(' ');
      if (this.selectedName) {
        this.searchedEvents.forEach(element => {
          let existName = false;
          names.forEach(name => {
            if (element.name.toLowerCase().includes(name.toLowerCase())) {
              existName = true;
            }
          });
          if (existName === false) {
            this.searchedEvents.delete(element);
          }
        });
      }
    }
    if (this.selectedDate) {
      const startDate = this.convertDate(this.selectedDate[0]);
      const endDate = this.convertDate(this.selectedDate[1]);

      this.searchedEvents.forEach(element => {
        const eventDate = this.convertDate(element.date_time);

        if (this.reverseAndTimeStamp(eventDate) > this.reverseAndTimeStamp(startDate) && this.reverseAndTimeStamp(eventDate) < this.reverseAndTimeStamp(endDate)) {
        } else {
          this.searchedEvents.delete(element);
        }
      });
    }
  }

  keyUpFunction(event) {
    this.pretraziEvente();
  }

  prikaziDetalje(event: any) {
    this.router.navigate(['/detalji-eventa', event.id]);
  }

  convertDate(str) {
    const date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), day, mnth].join('-');
  }

  reverseAndTimeStamp(dateString) {
    const reverse = new Date(dateString.split('-').reverse().join('-'));
    return reverse.getTime();
  }

  onChangedCity() {
    if (this.selectedCity != 0) {
      this.placesForDropDown = new Array<Place>();
      this.places.forEach(place => {
        if (place.city.id == this.selectedCity) {
          this.placesForDropDown.push(place);
        }
      });
      this.selectedPlace = 0;
    } else {
      this.placesForDropDown = this.places;
    }

    this.pretraziEvente();
  }

  onChangedCategory() {
    this.pretraziEvente();
  }

  onChangedPlace() {
    this.pretraziEvente();
  }

  onChangedDate(event) {
    this.selectedDate = event;
    this.pretraziEvente();
  }

  onChangedName() {
    this.pretraziEvente();
  }
}
