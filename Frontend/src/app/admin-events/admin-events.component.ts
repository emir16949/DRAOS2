import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event/event.service';
import { CategoryService } from '../services/category/category.service';
import { PlaceService } from '../services/place/place.service'
import { Router } from '@angular/router';
import { Event } from '../services/event/Event';

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
    picture_url: '',
    category: {
      id: null
    },
    place: {
      id: null
    }
  };

  categories: Array<any>;
  places: Array<any>;

  odabranaCategory: any;
  odabraniPlace: any;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private router: Router) { }

  ngOnInit() {

    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
      console.log(this.categories.length)
    });

    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
      console.log(this.places.length);
    });

    /*this.eventService.getEventsByCategory("muzika").subscribe(data => {
      this.events = data;
      console.log(this.events.length);
    });*/
  }

  /*obrisi(event: any){

    this.eventService.deleteEvent(event.id).subscribe(data => {
      console.log('successful');
    });
  }*/

  /*prikaziDetalje(event) {
    this.modal_naziv = event.name;
    this.modal_opis = event.description;
    this.modal_kategorija ="a";
    //this.modal_adresa = place.address;
  }*/

  loadajStranicu() {
    window.location.reload();
  }

  kreirajEvent() {
    console.log(this.event);

    this.event.category.id = this.odabranaCategory;
    this.event.place.id = this.odabraniPlace;
    this.eventService.createEvent(this.event).subscribe(data => {
    });
  }

  zatvori() {
    this.event.name = '';
    this.event.description = '';
    this.event.place.id = null;
    this.event.category.id = null;
    this.odabranaCategory = null;
    this.odabraniPlace = null;
  }

  /*sacuvajIzmjeneEvent(){
    
      this.newEvent.name = this.modal_naziv;
      this.newEvent.description = this.modal_opis;
      this.newEvent.category.id = 1;
      this.newEvent.place.id = 1;

      this.eventService.changeEvent(this.newEvent).subscribe((data) => {
      console.log(data);
      this.loadajStranicu();
    });
  }*/


}
