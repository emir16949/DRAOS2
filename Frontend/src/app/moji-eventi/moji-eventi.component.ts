import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { AuthService } from '../core/auth.service';
import { PlaceService } from '../services/place/place.service';
import { TokenStorage } from '../core/token.storage';
import { Place } from '../services/place/Place';

@Component({
  selector: 'moji-eventi',
  templateUrl: './moji-eventi.component.html',
  styleUrls: ['./moji-eventi.component.css']
})
export class MojiEventiComponent implements OnInit {

  eventPut: Event = new Event();
  events: Array<any> = new Array<Event>();
  event: Event = new Event();
  selectedEvent: Event;
  modal_naziv: any;
  modal_opis: any;
  modal_kategorija: any;
  isAdmin: any;
  mouseEnterHover: any = false;
  bojaKategorije: any;
  deleteSelectedEvent: Event = new Event();
  success = false;
  successMessage = '';
  minDate = null;
  places: Array<any>;
  categories: Array<any>;

  constructor(
    private eventService: EventService,
    private router: Router,
    private appComponent: AppComponent,
    private placeService: PlaceService,
    private authService: AuthService) { }

  ngOnInit() {
    const date = new Date();
    this.minDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

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
    this.getAllEvents();

    this.placeService.getAllPlaces().subscribe(data => {
      this.places = new Array<Place>();
      if (this.authService.isAdmin() === true) {
        this.places = data;
      } else {
        for (const place of data) {
          if (place.manager.username === TokenStorage.getCurrentUser()) {
            this.places.push(place);
          }
        }
      }
    });
  }

  getAllEvents() {
    let tempEvents = new Array<Event>();
    this.events = new Array<Event>();
    this.eventService.getAllEvents().subscribe(data => {
      tempEvents = data;
      if (this.isAdmin) {
        this.events = data;
      } else {
        tempEvents.forEach(event => {
          if (event.place.manager.username === TokenStorage.getCurrentUser()) {
            this.events.push(event);
          }
        });
      }
    });
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

  // sacuvajIzmjeneEvent() {
  //     this.eventService.changeEvent(this.eventPut).subscribe();
  //     window.location.reload();
  // }

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

  obrisiEvent(event: Event) {
    this.deleteSelectedEvent = event;
  }

  sacuvajIzmjeneEvent() {
    // this.errorLink = '';
    // this.errorNaziv = '';
    // this.errorDetalji = '';
    // this.errorAdresa = '';

    // this.errorExist = false;
    // if (!this.objekatPut.name) {
    //     this.error = " *Obavezno polje";
    //     this.errorNaziv = " *";
    //     this.errorExist = true;
    // }
    // if (!this.objekatPut.description) {
    //     this.error = " *Obavezno polje";
    //     this.errorDetalji = " *";
    //     this.errorExist = true;
    // }

    // if (!this.objekatPut.address) {
    //     this.error = " *Obavezno polje";
    //     this.errorAdresa = " *";
    //     this.errorExist = true;
    // }
    // if (this.objekatPut.name.length < 3) {
    //     if (this.errorExist === false)
    //         this.error = " *Uneseni tekst je prekratak.";
    //     this.errorNaziv = " *";
    //     this.errorExist = true;
    // }
    // if (this.objekatPut.description.length < 3) {
    //     if (this.errorExist === false)
    //         this.error = " *Uneseni tekst je prekratak.";
    //     this.errorDetalji = " *";
    //     this.errorExist = true;
    // }
    // if (this.objekatPut.address.length < 5) {
    //     if (this.errorExist === false)
    //         this.error = " *Uneseni tekst je prekratak.";
    //     this.errorAdresa = " *";
    //     this.errorExist = true;
    // }

    // if (this.objekatPut.place_url.length <= 4 || !this.objekatPut.place_url.match(/([a-z0-9_\-]{1,5}:\/\/)?(([a-z0-9_\-]{1,}):([a-z0-9_\-]{1,})\@)?((www\.)|([a-z0-9_\-]{1,}\.)+)?([a-z0-9_\-]{3,})(\.[a-z]{2,4})(\/([a-z0-9_\-]{1,}\/)+)?([a-z0-9_\-]{1,})?(\.[a-z]{2,})?(([\?\&][a-z0-9_\-]{1,}\=[a-z0-9_\-]{1,})+)?/gi)) {
    //     if (this.errorExist === false) {
    //         this.errorLink = ' *';
    //         this.error = 'Unesite ispravan link postojeće web-stranice.';
    //         this.errorExist = true;
    //     }
    // }

    // if (this.errorExist === false) {
    //     this.placeService.changePlace(this.objekatPut).subscribe();
    //     this.success = true;
    //     this.editPlaceModal.nativeElement.click();
    //     this.successMessage = "Objekat uspješno ažuriran!";
    //     setTimeout(() => { this.getAllPlaces(); this.success = false; }, 2000);
    // }

  }

  urediEvent(event: Event) {
    // this.adresa = place.address.name;
    this.eventPut = event;
    // this.objekatPut.name = place.name;
    // this.objekatPut.place_url = place.place_url;
    // this.objekatPut.description = place.description;
    // this.objekatPut.address = place.address;
    // this.objekatPut.city.id = place.city.id;
  }

  deleteSelectedEvents() {
    this.eventService.deleteEvent(this.deleteSelectedEvent.id).subscribe();
    this.success = true;
    this.successMessage = 'Događaj uspješno obrisan!';
    setTimeout(() => { this.getAllEvents(), this.success = false; }, 2000);
  }
}
