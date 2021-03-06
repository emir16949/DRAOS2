import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../core/token.storage';
import { User } from '../services/user/User';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = new User();
  loggedUser: any;
  ponovniPassword: any;
  trenutniPasswordChecked = true;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = TokenStorage.getCurrentUser();
    this.userService.getByUsername(this.loggedUser).subscribe(data => {
      this.user = data[0];
      this.user.password = '';
    });
  }

  urediProfil() {
    if (!this.trenutniPasswordChecked) {
      if (this.user.password.length < 6) {
        alert('Uneseni password je kraći od 6 znakova. Molimo unesite password dovoljne dužine.');
        return;
      }
      if (this.user.password !== this.ponovniPassword) {
        alert('Password I ponovljeni password se ne slažu. Molimo unesite ih ponovo.');
        return;
      }
      this.userService.updateUser(this.user).subscribe(data => {
        alert('Korisnik uspješno editovan.');
      });
    } else {
      this.userService.updateUserWithoutPassword(this.user).subscribe(data => {
        alert('Korisnik uspješno editovan.');
      });
    }
  }
}
