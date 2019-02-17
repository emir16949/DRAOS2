import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event/event.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Event } from '../services/event/Event';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {

  eventPut: Event = {
    id: null,
    name: '',
    description: '',
    picture: '',
    category: {
      id: null
    },
    place: {
      id: null
    }
  };

  events: Array<any>;
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
    }
  };

  selectedEvent: any;

  modal_naziv: any;
  modal_opis: any;
  modal_kategorija: any;
  isAdmin: any;

  mouseEnterHover: any = false;


  constructor(private eventService: EventService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.isAdmin = this.appComponent.isAdmin;
    this.eventService.getEventsByCategory("Sport").subscribe(data => {
      this.events = data;
    });
  }

  prikaziDetalje(event: any) {
    this.selectedEvent = event;
    this.router.navigate(['/sport-detalji', this.selectedEvent.id]);
  }

  obrisi(event: any) {

    this.eventService.deleteEvent(event.id).subscribe(data => {
      console.log('successful');
    });
    window.location.reload();
  }

  prikaziDetaljeIzmjena(event) {
    this.eventPut = event;
    this.modal_naziv = event.name;
    this.modal_opis = event.description;
    this.modal_kategorija = event.category.name;
  }

  sacuvajIzmjeneEvent() {
    this.eventService.changeEvent(this.eventPut).subscribe(data => {
      console.log('successful');
      window.location.reload();
    });
  }

  zatvori() {
    window.location.reload();
  }

  mouseEnter(){
    this.mouseEnterHover = true;
  }

  mouseLeave(){
    this.mouseEnterHover = false;
  }
}
