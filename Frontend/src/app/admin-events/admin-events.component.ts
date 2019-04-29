import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { CategoryService } from '../services/category/category.service';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { Place } from '../services/place/Place';
import { PlaceService } from '../services/place/place.service';
import { Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {

  event: Event = new Event();
  categories: Array<any>;
  places: Array<any>;
  odabranaCategory: any;
  odabraniPlace: any;
  minDate: any;
  url: string;
  selectedImage: string;
  error: string = "";
  success: any = false;
  successMessage: any = "";
  errorMessage: any = "";
  errorNewEvent: any = false;
  errorName: string = '';
  errorDescription: string = '';
  errorDate: string = '';
  errorCategory: string = '';
  errorPlace: string = '';
  errorImage: string = '';

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private placeService: PlaceService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    let date = new Date();
    this.minDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
    });
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

  loadajStranicu() {
    window.location.reload();
  }

  validateFields() {
    this.errorName = '';
    this.errorDescription = '';
    this.errorDate = '';
    this.errorCategory = '';
    this.errorImage = '';
    this.errorPlace = '';
    let errorExist = false;
    if (this.event.name === "") {
      this.errorName = ' *';
      errorExist = true;
    }
    if (this.event.description === "") {
      this.errorDescription = ' *';
      errorExist = true;
    }
    if (!this.event.date_time) {
      this.errorDate = ' *';
      errorExist = true;
    }
    if (!this.selectedImage) {
      this.errorImage = ' *';
      errorExist = true;
    }
    if (!this.odabranaCategory) {
      this.errorCategory = ' *';
      errorExist = true;
    }
    if (!this.odabraniPlace) {
      this.errorPlace = ' *';
      errorExist = true;
    }
    if (errorExist) {
      this.error = "* Popunite obavezna polja!";
      return false;
    } else {
      if (this.event.name.length < 3) {
        this.errorName = ' *';
        this.error = "* Uneseno ime je prekratko!";
        return false;
      }
    }

    return true;
  }


  kreirajEvent() {
    this.event.category.id = this.odabranaCategory;
    this.event.place.id = this.odabraniPlace;
    this.event.picture = this.selectedImage;
    let validated = this.validateFields();
    if (validated) {
      this.eventService.createEvent(this.event).subscribe();
      this.success = true;
      this.successMessage = "Uspješno kreiran novi dogadjaj!";
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
    else {
      this.errorNewEvent = true;
      this.errorMessage = this.error;
    }
  }

  zatvori() {
    this.event.name = '';
    this.event.description = '';
    this.event.place.id = null;
    this.event.category.id = null;
    this.odabranaCategory = null;
    this.odabraniPlace = null;
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
