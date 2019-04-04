import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth.service';
import { TokenStorage } from './core/token.storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: Array<any> = [
    { 'name': 'muzika', 'text': 'Muzika', 'color': 'lineBlue' },
    { 'name': 'kultura', 'text': 'Kultura', 'color': 'lineOrange' },
    { 'name': 'sport', 'text': 'Sport ', 'color': 'lineGreen' },
    { 'name': 'zabava', 'text': 'Zabava', 'color': 'lineYellow' },
    { 'name': 'nauka', 'text': 'Nauka', 'color': 'linePurple' }
  ];
  selectedIndex: number;
  title = 'app';
  events: Array<any>;
  modal_naziv: any;
  findByEvent: any;
  findByPlace: any;
  odabranaOpcijaPretrage: any;
  opcijePretrage = [
    { id: 1, name: 'Pretraga po nazivu događaja' },
    { id: 2, name: 'Pretraga po nazivu lokala' }
  ];
  isLoggedIn: boolean;
  isAdmin: boolean;
  loggedUser: any;
  isSearchOpen = false;

  constructor(private router: Router, private authService: AuthService) { }

  pretraga() {
    this.isSearchOpen = !this.isSearchOpen;
    this.router.navigate(['/pretraga']);
  }

  goToHomePage() {
    localStorage.setItem('kategorija', this.items[0].text);
    this.router.navigate(['/svi-eventi-iz-kategorije']);
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
    this.loggedUser = TokenStorage.getCurrentUser();
    const kat = localStorage.getItem('kategorija');
    this.selectedIndex = 0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].text === kat) {
        this.selectedIndex = i;
      }
    }
  }

  odjaviSe() {
    TokenStorage.logOut();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  select(index: number) {
    this.selectedIndex = index;
    localStorage.setItem('kategorija', this.items[index].text);
    this.router.navigate(['/svi-eventi-iz-kategorije']);
    window.location.reload();
  }
}
