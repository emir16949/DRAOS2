import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { UserService } from '../services/user/user.service';
import { Place } from '../services/place/Place';
import { City } from '../services/place/City';
import { User } from '../services/user/User';

@Component({
  selector: 'app-admin-lokacija',
  templateUrl: './admin-lokacija.component.html',
  styleUrls: ['./admin-lokacija.component.css']
})
export class AdminLokacijaComponent implements OnInit {

  places: Array<any>;
  objekat: Place = new Place();
  objekatPut: Place = new Place();
  odabraniGrad: number;
  cities: Array<any>;
  objekat_name: any;
  objekat_description: any;
  modal_naziv: any;
  modal_opis: any;
  modal_adresa: any;
  adresa: any;
  url: string;
  selectedImage: string;
  odabraniMenadzer: number;
  users: Array<any>;

  constructor(private placeService: PlaceService,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllPlaces();

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
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
      console.log("amra1");
      reader.onload = this._handleReaderLoaded.bind(this);
      console.log("amra2");
      reader.readAsBinaryString(event.target.files[0]);

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.dispatchEvent.name;
      }
    }
}

  _handleReaderLoaded(readerEvt) {

    var binaryString = readerEvt.target.result;
    this.selectedImage = btoa(binaryString);

  }

  kreirajObjekat() {
    console.log("kreiranje objekta...." + this.odabraniGrad + this.odabraniMenadzer);
    this.objekat.city.id = this.odabraniGrad;
    this.objekat.picture = this.selectedImage;
    console.log("objekat: " + this.objekat);
    this.placeService.createPlace(this.objekat).subscribe(data => {
      console.log("kreiranje objekta");
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
}
