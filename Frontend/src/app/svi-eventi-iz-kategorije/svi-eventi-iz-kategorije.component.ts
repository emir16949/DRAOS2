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

  eventPut: Event = new Event();
  allEvents: Array<any>;
  events: Array<any>;
  event: Event = new Event();
  selectedEvent: Event;
  modal_naziv: any;
  modal_opis: any;
  modal_kategorija: any;
  isAdmin: any;
  mouseEnterHover: any = false;
  bojaKategorije: any;

  constructor(
    private eventService: EventService,
    private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit() {
    this.isAdmin = this.appComponent.isAdmin;
    let kategorija = localStorage.getItem('kategorija');
    if (kategorija == null) {
      kategorija = 'Muzika';
    }
    if (kategorija === 'Muzika') {
      this.bojaKategorije = '#36befa';
    } else if (kategorija === 'Kultura') {
      this.bojaKategorije = '#ff724f';
    } else if (kategorija === 'Sport') {
      this.bojaKategorije = '#27ab93';
    } else if (kategorija === 'Zabava') {
      this.bojaKategorije = '#ffd33b';
    } else if (kategorija === 'Nauka') {
      this.bojaKategorije = '#b831f3';
    }
    this.eventService.getEventsByCategory(kategorija).subscribe(data => {
      this.events = data;
      this.allEvents = data;
    });
  }

  prikaziAdminDogadjaje() {
    this.events = this.events.filter((event) => event.place.manager.user_role.id == 1);
  }

  prikaziSveDogadjaje() {
    this.events = this.allEvents;
  }

  prikaziDetalje(event: any) {
    this.eventPut = this.selectedEvent;
    this.selectedEvent = event;
    this.router.navigate(['/detalji-eventa', this.selectedEvent.id]);
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

  clickOnCarouselItem(event) {
    this.router.navigate(['/detalji-eventa', event.id]);
  }

  changeBackground() {
    return { 'background-color': this.bojaKategorije };
  }
}
