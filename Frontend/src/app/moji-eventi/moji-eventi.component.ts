import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { Category } from '../services/category/Category';
import { CategoryService } from '../services/category/category.service';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { Place } from '../services/place/Place';
import { PlaceService } from '../services/place/place.service';

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
  categories: Array<Category>;
  odabranaKategorija: any;
  odabraniPlace: any;
  selectedDate: any;

  error: any;
  errorExist = false;
  errorNaziv = '';
  nazivPut = '';
  opisPut = '';
  cijenaPut = 0;
  datumPut: any;
  errorDescription = '';
  errorCijena = '';
  selectedImage = '';
  @ViewChild('editEventModal') editEventModal: any;

  constructor(
    private eventService: EventService,
    private router: Router,
    private appComponent: AppComponent,
    private placeService: PlaceService,
    private authService: AuthService,
    private categoryService: CategoryService) { }

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

    this.categoryService.getAllCategory().subscribe((response: Array<any>) => {
      this.categories = new Array(response.length);
      for (let i = 0; i < response.length; i++) {
        delete response[i].events;
        this.categories[i] = response[i];
      }
    });
  }

  getAllEvents() {
    this.events = new Array<Event>();
    this.eventService.getAllEvents().subscribe(data => {
      if (this.isAdmin) {
        this.events = data;
      } else {
        data.forEach(event => {
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
    this.errorCijena = '';
    this.error = '';
    this.errorDescription = '';

    this.categories.forEach(category => {
      if (category.id == this.odabranaKategorija) {
        this.eventPut.category = category;
      }
    });
    this.places.forEach(place => {
      if (place.id == this.odabraniPlace) {
        this.eventPut.place = place;
      }
    });
    if (!this.nazivPut) {
      this.error = " *Obavezno polje";
      this.errorNaziv = " *";
      this.errorExist = true;
    }

    if (!this.opisPut) {
      this.error = " *Obavezno polje";
      this.errorDescription = " *";
      this.errorExist = true;
    }

    if (this.cijenaPut == null || this.cijenaPut == undefined) {
      this.error = " *Obavezno polje";
      this.errorCijena = " *";
      this.errorExist = true;
    }

    if (this.errorExist) {
      this.error = '* Popunite obavezna polja!';
      return false;
    } else {
      if (this.nazivPut.length < 3) {
        this.errorNaziv = ' *';
        this.error = '* Uneseno ime je prekratko (minimalno 3 karaktera).';
        return false;
      }
    }

    if (!this.errorExist) {

      this.eventPut.name = this.nazivPut;
      this.eventPut.description = this.opisPut;
      this.eventPut.price = this.cijenaPut;
      this.eventPut.date_time = this.datumPut;
      if (this.selectedImage) {
        this.eventPut.picture = this.selectedImage;
      }
      this.eventService.changeEvent(this.eventPut).subscribe();
      this.success = true;
      this.editEventModal.nativeElement.click();
      this.successMessage = "Događaj uspješno ažuriran!";
      setTimeout(() => this.getAllEvents(), 200);
      setTimeout(() => this.success = false, 2000);
    }
  }

  urediEvent(event: Event) {
    this.nazivPut = event.name;
    this.opisPut = event.description;
    this.cijenaPut = event.price;

    this.eventPut = event;
    this.selectedDate = this.eventPut.date_time;
    this.datumPut = new Date(this.eventPut.date_time).toISOString().slice(0, -1);
    this.odabranaKategorija = this.eventPut.category.id;
    this.odabraniPlace = this.eventPut.place.id;
  }

  deleteSelectedEvents() {
    this.eventService.deleteEvent(this.deleteSelectedEvent.id).subscribe();
    this.success = true;
    this.successMessage = 'Događaj uspješno obrisan!';
    setTimeout(() => this.getAllEvents(), 200);
    setTimeout(() => this.success = false, 2000);
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handleReaderLoaded(e) {
    this.selectedImage = 'data:image/JPEG;base64,' + btoa(e.target.result);
  }
}
