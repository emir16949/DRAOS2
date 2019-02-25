import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { Place } from '../services/place/Place';
import { City } from '../services/place/City';

@Component({
  selector: 'app-admin-lokacija',
  templateUrl: './admin-lokacija.component.html',
  styleUrls: ['./admin-lokacija.component.css']
})
export class AdminLokacijaComponent implements OnInit {

  places: Array<Place>;
  objekat: Place = new Place();
  objekatPut: Place;
  odabraniGrad: any;
  cities: City[];
  objekat_name: any;
  objekat_description: any;
  modal_naziv: any;
  modal_opis: any;
  modal_adresa: any;
  adresa: any;
  url: string;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getAllPlaces();
  }

  getAllPlaces() {
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });

    this.placeService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.dispatchEvent.name;
      }
    }
}

  kreirajObjekat() {
    this.objekat.city.id = this.odabraniGrad;
    this.placeService.createPlace(this.objekat).subscribe(data => {
      console.log(data);
    });
    window.location.reload();
  }

  prikaziDetalje(place) {
    this.modal_naziv = place.name;
    this.modal_opis = place.description;
    this.modal_adresa = place.address;
  }

  sacuvajIzmjenePlace() {
    this.placeService.changePlace(this.objekatPut).subscribe(data => { });
    window.location.reload()
  }

  urediPlace(place) {
    this.adresa = place.address.name;
    this.objekatPut.id = place.id;
    this.objekatPut.name = place.name;
    this.objekatPut.description = place.description;
    this.objekatPut.address = place.address;
    this.objekatPut.city.id = place.city.id;
  }

  obrisiLokaciju(place) {
    this.placeService.deletePlace(place.id).subscribe(data => { });
  }

  zatvori() {
    window.location.reload();
  }
  //binarni kod hexadekadno
}
