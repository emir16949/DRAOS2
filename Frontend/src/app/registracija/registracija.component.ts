import { Component, OnInit } from '@angular/core';
import { User } from '../services/user/User';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { AppComponent } from '../app.component';
import { UserModel } from '../services/user/UserModel';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  user: UserModel = {
    username: '',
    password: '',
    email: '',
    ime: '',
    prezime: '',
    user_role: {
      id: 2,
    }
  };

  constructor(private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorage,
    private appComponent: AppComponent,
    private userService: UserService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(['/muzika']);
  }

  uzmiToken() {
    this.authService.attemptAuth(this.user.username, this.user.password)
      .subscribe(
        data => {
          TokenStorage.saveToken(data.token);
          TokenStorage.saveCurrentUser(this.user.username);
          this.appComponent.goToHomePage();
          this.appComponent.isLoggedIn = true;
          this.appComponent.isAdmin = this.authService.isAdmin();
        },
        error => {
          console.error('Registration failed...' + error);
          //  this.alert.open('Login failed. Wrong username or password!', null, { duration: 3000 });
        },
        () => {
          console.log('User: ' + this.user.username + ' successfuly logged in...');
          //this.alert.open('Login successful', null, { duration: 3000 });
        }
      );
  }

  registrujSe(): void {
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(data => console.log(data));
  }

  zatvori() {
    this.router.navigate(['/login']);
  }
}
