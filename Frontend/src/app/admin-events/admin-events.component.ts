import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category/category.service';
import { Event } from '../services/event/Event';
import { EventService } from '../services/event/event.service';
import { PlaceService } from '../services/place/place.service';

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
    picture: '',
    category: {
      id: null
    },
    place: {
      id: null
    },
    price: 0,
  };

  categories: Array<any>;
  places: Array<any>;
  odabranaCategory: any;
  odabraniPlace: any;
  url: string;
  selectedImage: string;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private placeService: PlaceService) { }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe(data => {
      this.categories = data;
    });
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });

  }

  loadajStranicu() {
    window.location.reload();
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      console.log("amra1");
      reader.onload = this._handleReaderLoaded.bind(this);
      console.log("amra2");
      //reader.readAsBinaryString(event.target.files[0]);

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.dispatchEvent.name;
      }
    }
}

  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.selectedImage = btoa(binaryString);

  }

  kreirajEvent() {
    this.event.category.id = this.odabranaCategory;
    this.event.place.id = this.odabraniPlace;
    this.event.picture = this.selectedImage;
    this.eventService.createEvent(this.event).subscribe();
  }

  zatvori() {
    this.event.name = '';
    this.event.description = '';
    this.event.place.id = null;
    this.event.category.id = null;
    this.odabranaCategory = null;
    this.odabraniPlace = null;
  }
}
