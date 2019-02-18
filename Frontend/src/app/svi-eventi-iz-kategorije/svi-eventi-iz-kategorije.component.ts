import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-svi-eventi-iz-kategorije',
  templateUrl: './svi-eventi-iz-kategorije.component.html',
  styleUrls: ['./svi-eventi-iz-kategorije.component.css']
})
export class SviEventiIzKategorijeComponent implements OnInit {

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
    },
    price: 0
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
    },
    price: 0
  };
  selectedEvent: Event;
  modal_naziv: any;
  modal_opis: any;
  modal_kategorija: any;
  isAdmin: any;
  mouseEnterHover: any = false;

  constructor(
    private eventService: EventService,
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.isAdmin = this.appComponent.isAdmin;
    let kategorija = localStorage.getItem('kategorija');
    this.eventService.getEventsByCategory(kategorija).subscribe(data => {
      this.events = data;
    });
  }

  prikaziDetalje(event: any) {
    this.eventPut = this.selectedEvent;
    this.selectedEvent = event;
    this.router.navigate(['/detalji-eventa', this.selectedEvent.id]);
  }

  obrisi(event: any) {
    this.eventService.deleteEvent(event.id).subscribe();
    window.location.reload();
  }

  prikaziDetaljeIzmjena(event) {
    this.eventPut = event;
    this.modal_naziv = event.name;
    this.modal_opis = event.description;
    this.modal_kategorija = event.category.name;
  }

  sacuvajIzmjeneEvent() {
    this.eventService.changeEvent(this.eventPut).subscribe();
    window.location.reload();
  }

  zatvori() {
    window.location.reload();
  }

  mouseEnter() {
    this.mouseEnterHover = true;
  }

  mouseLeave() {
    this.mouseEnterHover = false;
  }
}
