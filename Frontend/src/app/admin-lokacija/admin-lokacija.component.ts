import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { Place } from '../services/place/Place';
import { PlaceService } from '../services/place/place.service';
import { UserService } from '../services/user/user.service';


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
  selectedImage: string = '';
  odabraniMenadzer: number;
  users: Array<any>;
  @ViewChild('file') el: ElementRef;
  uploadedFile: string;
  mozeSeBrisati = true;
  error: string;
  errorNaziv: string;
  errorLink: string;
  errorDetalji: string;
  errorGrad: string;
  errorAdresa: string;
  errorMenadzer: string;
  success: any = false;
  successMessage: any = "";
  errorMessage: any = "";
  errorNewEvent: any = false;
  deleteSelectedPlace: Place = new Place();
  errorSlika: string;
  @ViewChild('newPlaceModal') placeModal: any;
  @ViewChild('editPlaceModal') editPlaceModal: any;


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
        this.mozeSeBrisati = true;
      } else {
        this.mozeSeBrisati = false;
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
    this.selectedImage = 'data:image/JPEG;base64,' + btoa(e.target.result);

    if (this.selectedImage.length > 26) {
      this.errorSlika = '';
      this.error = '';
    }
  }

  kreirajObjekat() {
    this.errorLink = '';
    this.errorNaziv = '';
    this.errorDetalji = '';
    this.errorAdresa = '';
    this.errorGrad = '';
    this.errorMenadzer = '';
    this.errorSlika = '';

    let errorExist = false;
    if (!this.objekat.name) {
      this.error = " *Obavezno polje";
      this.errorNaziv = " *";
      errorExist = true;
    }
    if (!this.objekat.description) {
      this.error = " *Obavezno polje";
      this.errorDetalji = " *";
      errorExist = true;
    }
    if (!this.odabraniGrad) {
      this.error = " *Obavezno polje";
      this.errorGrad = " *";
      errorExist = true;
    }
    if (!this.odabraniMenadzer) {
      this.error = " *Obavezno polje";
      this.errorMenadzer = " *";
      errorExist = true;
    }
    if (!this.objekat.address) {
      this.error = " *Obavezno polje";
      this.errorAdresa = " *";
      errorExist = true;
    }
    if (this.objekat.name.length < 3) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorNaziv = " *";
      errorExist = true;
    }
    if (this.objekat.description.length < 3) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorDetalji = " *";
      errorExist = true;
    }
    if (this.objekat.address.length < 5) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorAdresa = " *";
      errorExist = true;
    }

    if (this.objekat.place_url.length <= 4 || !this.objekat.place_url.match(/([a-z0-9_\-]{1,5}:\/\/)?(([a-z0-9_\-]{1,}):([a-z0-9_\-]{1,})\@)?((www\.)|([a-z0-9_\-]{1,}\.)+)?([a-z0-9_\-]{3,})(\.[a-z]{2,4})(\/([a-z0-9_\-]{1,}\/)+)?([a-z0-9_\-]{1,})?(\.[a-z]{2,})?(([\?\&][a-z0-9_\-]{1,}\=[a-z0-9_\-]{1,})+)?/gi)) {
      if (errorExist === false) {
        this.errorLink = ' *';
        this.error = 'Unesite ispravan link postojeće web-stranice.';
        errorExist = true;
      }
    }

    if (this.selectedImage.length < 26) {
      if (errorExist === false) {
        this.errorSlika = ' *';
        this.error = 'Odaberite fotografiju.';
        errorExist = true;
      }
    }


    if (errorExist === false) {
      this.objekat.city.id = this.odabraniGrad;
      this.objekat.picture = this.selectedImage;
      this.objekat.manager.id = this.odabraniMenadzer;
      this.placeService.createPlace(this.objekat).subscribe();
      this.success = true;
      this.placeModal.nativeElement.click();
      this.successMessage = "Uspješno dodana nova lokacija!";
      setTimeout(() => { this.getAllPlaces(); this.success = false; }, 2000);
    }
  }

  prikaziDetalje(place) {
    this.modal_naziv = place.name;
    this.modal_opis = place.description;
    this.modal_adresa = place.address;
  }

  sacuvajIzmjenePlace() {
    this.errorLink = '';
    this.errorNaziv = '';
    this.errorDetalji = '';
    this.errorAdresa = '';

    let errorExist = false;
    if (!this.objekatPut.name) {
      this.error = " *Obavezno polje";
      this.errorNaziv = " *";
      errorExist = true;
    }
    if (!this.objekatPut.description) {
      this.error = " *Obavezno polje";
      this.errorDetalji = " *";
      errorExist = true;
    }

    if (!this.objekatPut.address) {
      this.error = " *Obavezno polje";
      this.errorAdresa = " *";
      errorExist = true;
    }
    if (this.objekatPut.name.length < 3) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorNaziv = " *";
      errorExist = true;
    }
    if (this.objekatPut.description.length < 3) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorDetalji = " *";
      errorExist = true;
    }
    if (this.objekatPut.address.length < 5) {
      if (errorExist === false)
        this.error = " *Uneseni tekst je prekratak.";
      this.errorAdresa = " *";
      errorExist = true;
    }

    if (this.objekatPut.place_url.length <= 4 || !this.objekatPut.place_url.match(/([a-z0-9_\-]{1,5}:\/\/)?(([a-z0-9_\-]{1,}):([a-z0-9_\-]{1,})\@)?((www\.)|([a-z0-9_\-]{1,}\.)+)?([a-z0-9_\-]{3,})(\.[a-z]{2,4})(\/([a-z0-9_\-]{1,}\/)+)?([a-z0-9_\-]{1,})?(\.[a-z]{2,})?(([\?\&][a-z0-9_\-]{1,}\=[a-z0-9_\-]{1,})+)?/gi)) {
      if (errorExist === false) {
        this.errorLink = ' *';
        this.error = 'Unesite ispravan link postojeće web-stranice.';
        errorExist = true;
      }
    }

    if (errorExist === false) {
      this.placeService.changePlace(this.objekatPut).subscribe();
      this.success = true;
      this.editPlaceModal.nativeElement.click();
      this.successMessage = "Objekat uspješno ažuriran!";
      setTimeout(() => { this.getAllPlaces(); this.success = false; }, 2000);
    }

  }

  urediPlace(place) {
    this.adresa = place.address.name;
    this.objekatPut.id = place.id;
    this.objekatPut.name = place.name;
    this.objekatPut.place_url = place.place_url;
    this.objekatPut.description = place.description;
    this.objekatPut.address = place.address;
    this.objekatPut.city.id = place.city.id;
  }

  obrisiLokaciju(place: Place) {
    this.deleteSelectedPlace = place;
  }

  deleteSelectedLocation() {
    this.placeService.deletePlace(this.deleteSelectedPlace.id).subscribe();
    this.success = true;
    this.successMessage = 'Objekat uspješno obrisan!';
    setTimeout(() => { this.getAllPlaces(), this.success = false; }, 2000);
  }

  zatvori() {
    this.getAllPlaces();
  }
}
