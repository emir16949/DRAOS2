import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event/event.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Event } from '../services/event/Event';

@Component({
  selector: 'app-nauka',
  templateUrl: './nauka.component.html',
  styleUrls: ['./nauka.component.css']
})
export class NaukaComponent implements OnInit {

  eventPut: Event = {
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

  events: Array<any>;
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

  selectedEvent: any;

  modal_naziv: any;
  modal_opis: any;
  modal_kategorija: any;

  isAdmin: any;

  constructor(private eventService: EventService, private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.isAdmin = this.appComponent.isAdmin;
    this.eventService.getEventsByCategory("Nauka").subscribe(data => {
      this.events = data;
      console.log(this.events.length);
    });
  }

  prikaziDetalje(event: any) {
    this.router.navigate(['/nauka-detalji', event.id]);
  }

  obrisi(event: any) {
    this.eventService.deleteEvent(event.id).subscribe(data => { });
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
      window.location.reload();
    });
  }

  zatvori() {
    window.location.reload();
  }
}
