import { Component, OnInit, ViewChild } from '@angular/core';
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
  success: any = false;
  successMessage: any = '';
  errorMessage: any = '';
  errorNewEvent: any = false;
  selectedUser: User = new User();
  loggedInUsername: string;
  passwordDrugiPut: string = '';
  errorExist: boolean = false;
  @ViewChild('newUserModal') userModal: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
    this.isAdmin = this.authService.isAdmin();
    this.loggedInUsername = this.authService.getUserName();
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

    this.selectedUser = user;

  }

  deleteSelectedUser() {
    this.userService.deleteUserById(this.selectedUser.id).subscribe();
    this.success = true;
    this.successMessage = 'Menadžer uspješno obrisan!';
    setTimeout(() => { this.getAllUsers(), this.success = false; }, 2000);

  }

  pretragaUsername() {
    this.userService.getUserByUsername(this.username_pretraga).subscribe(data => {
      this.users = data;
    });
  }

  kreirajUsera(): void {
    this.errorExist = false;
    if (!this.korisnik.ime) {
      this.error = ' *Obavezno polje';
      this.errorIme = ' *';
      this.errorExist = true;
    }
    if (!this.korisnik.prezime) {
      this.error = ' *Obavezno polje';
      this.errorPrezime = ' *';
      this.errorExist = true;
    }
    if (!this.korisnik.username) {
      this.error = ' *Obavezno polje';
      this.errorUsername = ' *';
      this.errorExist = true;
    }
    if (!this.korisnik.email) {
      this.error = ' *Obavezno polje';
      this.errorEmail = ' *';
      this.errorExist = true;
    }
    if (!this.korisnik.password) {
      this.error = ' *Obavezno polje';
      this.errorSifra = ' *';
      this.errorExist = true;
    }
    if (this.errorExist === false) {
      this.users.forEach(user => {
        if (user.username === this.korisnik.username) {
          this.error = ' *Korisničko ime zauzeto. Izaberite drugo.';
          this.errorUsername = ' *';
          this.errorExist = true;
        }
      });
    }
    if (this.korisnik.ime.length < 3) {
      if (this.errorExist === false) {
        this.error = ' *Uneseno ime je prekratko.';
        this.errorIme = ' *';
        this.errorExist = true;
      }
    }
    if (this.korisnik.prezime.length < 3) {
      if (this.errorExist === false) {
        this.error = ' *Uneseno prezime je prekratko.';
        this.errorPrezime = ' *';
        this.errorExist = true;
      }
    }
    if (this.korisnik.password !== this.passwordDrugiPut) {
      if (this.errorExist === false) {
        this.error = ' *Šifre se ne poklapaju.';
        this.errorSifra = ' *';
        this.errorExist = true;
      }
    }

    var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+.[a-z0-9-]/;

    if (this.korisnik.email.length <= 5 || !EMAIL_REGEXP.test(this.korisnik.email)) {
      if (this.errorExist === false) {
        this.errorEmail = ' *';
        this.error = 'Unesite ispravan format maila!';
        this.errorExist = true;
      }
    }

    if (this.errorExist === false) {
      this.korisnik.user_role.id = 2;
      this.userService.createUser(this.korisnik).subscribe();
      this.success = true;
      this.userModal.nativeElement.click();
      this.successMessage = 'Uspješno kreiran novi menadžer!';
      setTimeout(() => { this.getAllUsers(); this.success = false; }, 2000);

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
    this.error = '';
    this.errorIme = '';
    this.errorPrezime = '';
    this.errorUsername = '';
    this.errorEmail = '';
    this.errorSifra = '';
    this.korisnik = new User();
  }
}
