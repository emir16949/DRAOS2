import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/user/User';

@Component({
  selector: 'app-admin-useri',
  templateUrl: './admin-useri.component.html',
  styleUrls: ['./admin-useri.component.css']
})
export class AdminUseriComponent implements OnInit {

  users: Array<any>;
  user: User = new User();
  korisnik: User = new User();
  username_pretraga: string;
  isAdmin = true;
  isLoggedIn = true;
  searchedUsers: Set<User> = null;
  selectedDropdow: string;
  error: string;
  errorIme: string;
  errorPrezime: string;
  errorUsername: string;
  errorEmail: string;
  errorSifra: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
    this.isAdmin = this.authService.isAdmin();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  openUserDetails(user) {
    this.router.navigate(['/user-detalji', user.id]);
  }

  deleteUser(user) {
    this.userService.deleteUserById(user.id).subscribe();
    setTimeout(() => { this.getAllUsers(); }, 1000);
  }

  pretragaUsername() {
    this.userService.getUserByUsername(this.username_pretraga).subscribe(data => {
      this.users = data;
    });
  }

  kreirajUsera(): void {
    let errorExist = false;
    if (!this.korisnik.ime) {
      this.error = " *Obavezno polje";
      this.errorIme = " *";
      errorExist = true;
    }
    if (!this.korisnik.prezime) {
      this.error = " *Obavezno polje";
      this.errorPrezime = " *";
      errorExist = true;
    }
    if (!this.korisnik.username) {
      this.error = " *Obavezno polje";
      this.errorUsername = " *";
      errorExist = true;
    }
    if (!this.korisnik.email) {
      this.error = " *Obavezno polje";
      this.errorEmail = " *";
      errorExist = true;
    }
    if (!this.korisnik.password) {
      this.error = " *Obavezno polje";
      this.errorSifra = " *";
      errorExist = true;
    }
    if (errorExist === false) {
      this.users.forEach(user => {
        if (user.username === this.korisnik.username) {
          this.error = " *Korisničko ime zauzeto. Izaberite drugo.";
          this.errorUsername = " *";
          errorExist = true;
        }
      });
    }
    if (errorExist === false) {

    }
    if (errorExist === false) {
      this.korisnik.user_role.id = 2;
      this.userService.createUser(this.korisnik).subscribe();
      setTimeout(() => { this.getAllUsers(); }, 1000);
    }
  }

  keyUpFunction(event): void {

    if (this.username_pretraga) {
      this.searchedUsers = new Set<User>();
      this.users.forEach(element => { this.searchedUsers.add(element); });

      const words = this.username_pretraga.split(' ');

      this.searchedUsers.forEach(element => {
        let existName = false;
        words.forEach(word => {
          if (element.ime.toLowerCase().includes(word.toLowerCase()) || element.prezime.toLowerCase().includes(word.toLowerCase()) || element.username.toLowerCase().includes(word.toLowerCase()) || element.email.toLowerCase().includes(word.toLowerCase())) {
            existName = true;
          }
        });
        if (existName === false) {
          this.searchedUsers.delete(element);
        }
      });
    } else {
      this.searchedUsers = null;
    }
  }

  clearModal(): void {
    this.error = "";
    this.errorIme = "";
    this.errorPrezime = "";
    this.errorUsername = "";
    this.errorEmail = "";
    this.errorSifra = "";
    this.korisnik = new User();
  }
}
