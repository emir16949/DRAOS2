import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './services/event/event.service';
import { AuthService } from './core/auth.service';
import { TokenStorage } from './core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: Array<any> = [{ 'name': 'muzika', 'text': 'Muzika', 'color':'lineBlue' }, { 'name': 'kultura', 'text': 'Kultura', 'color':'lineOrange' }, { 'name': 'sport', 'text': 'Sport ', 'color':'lineGreen' }, { 'name': 'zabava', 'text': 'Zabava', 'color':'lineYellow' }, { 'name': 'nauka', 'text': 'Nauka', 'color':'linePurple' }];
  selectedIndex: number;
  title = 'app';
  events: Array<any>;
  modal_naziv: any;
  findByEvent: any;
  findByPlace: any;
  odabranaOpcijaPretrage: any;
  opcijePretrage = [{ id: 1, name: 'Pretraga po nazivu događaja' }, { id: 2, name: 'Pretraga po nazivu lokala' }];
  isLoggedIn: boolean;
  isAdmin: boolean;
  loggedUser: any;
  isSearchOpen: boolean = false;

  constructor(private router: Router, private eventService: EventService, private authService: AuthService) { }

  pretraga() {
    this.isSearchOpen = !this.isSearchOpen;
  }

  goToHomePage() {
    this.router.navigate(['/muzika']);
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.loggedUser = TokenStorage.getCurrentUser();
  }

  odjaviSe() {
    TokenStorage.logOut();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  select(index: number) {
    this.selectedIndex = index;
  }
}
