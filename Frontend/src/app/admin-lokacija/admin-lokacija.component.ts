import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlaceService } from '../services/place/place.service';
import { UserService } from '../services/user/user.service';
import { Place } from '../services/place/Place';
import { TokenStorage } from '../core/token.storage';
import { AuthService } from '../core/auth.service';
import { City } from '../services/place/City';
import { User } from '../services/user/User';
import { analyzeAndValidateNgModules } from '@angular/compiler';


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
  @ViewChild('file') el: ElementRef;
  uploadedFile: string;

  constructor(
    private placeService: PlaceService,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAllPlaces();

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  getAllPlaces() {
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

    this.placeService.getAllCities().subscribe(data => {
      this.cities = data;
    });
  }

  base64textString = [];

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    console.log(file);
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  
  handleReaderLoaded(e) {
    this.base64textString.push('data:image/JPEG;base64,' + btoa(e.target.result));
    this.selectedImage = this.base64textString.toString();
    console.log(this.selectedImage);
  }

  kreirajObjekat() {

    console.log("kreiranje objekta...." + this.odabraniGrad + this.odabraniMenadzer);
    this.objekat.city.id = this.odabraniGrad;
    this.objekat.picture = this.selectedImage;
    this.objekat.manager.id = this.odabraniMenadzer;
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
    window.location.reload();
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
