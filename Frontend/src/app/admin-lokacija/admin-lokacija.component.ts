import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { Place } from '../services/place/Place';

@Component({
  selector: 'app-admin-lokacija',
  templateUrl: './admin-lokacija.component.html',
  styleUrls: ['./admin-lokacija.component.css']
})
export class AdminLokacijaComponent implements OnInit {

  places: any;

  objekat: Place = {
    name: '',
    description: '',
    address: {
      id: null
    }
  };

  objekatPut: Place = {
    id: null,
    name: '',
    description: '',
    address: {
      id: null
    }
  };

  odabranaAdresa: any;
  addresses: any;

  objekat_name: any;
  objekat_description: any;

  modal_naziv: any;
  modal_opis: any;
  modal_adresa: any;

  adresa: any;

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getAllPlaces();
  }

  getAllPlaces() {
    this.placeService.getAllPlaces().subscribe(data => {
      this.places = data;
    });

    this.placeService.getAllAddresses().subscribe(data => {
      this.addresses = data;
    });
  }

  kreirajObjekat() {
    this.objekat.address.id = this.odabranaAdresa;
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
    this.objekatPut.address.id = place.id;
  }

  obrisiLokaciju(place) {
    this.placeService.deletePlace(place.id).subscribe(data => { });
  }

  zatvori() {
    window.location.reload();
  }

}
