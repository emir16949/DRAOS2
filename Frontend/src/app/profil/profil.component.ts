import { Component, OnInit } from '@angular/core';
import { User } from '../services/user/User';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { AppComponent } from '../app.component';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User = {
    id: null,
    username: '',
    password: '',
    email: '',
    ime: '',
    prezime: '',
    user_role: {
      id: null,
    }
  };

  loggedUser: any;
  ponovniPassword: any;

  constructor(private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorage,
    private appComponent: AppComponent,
    private userService: UserService) { }

  ngOnInit() {
    this.loggedUser = TokenStorage.getCurrentUser();

    this.userService.getByUsername(this.loggedUser).subscribe(data => {
      this.user = data;
    });

  }

  urediProfil() {
    if (this.user.password === this.ponovniPassword) {
      console.log('PASSWORD JE OK');
    } else {
      alert('PASSWORD I PONOVLJENI PASSWORD SE NE SLAŽU. Molimo unesite ih ponovo.');
    }
    this.userService.updateUser(this.user).subscribe(data => console.log(data));
  }

  zatvori() {
    window.location.reload();
  }

}
