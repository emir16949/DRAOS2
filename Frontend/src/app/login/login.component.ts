import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { TokenStorage } from '../core/token.storage';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: any;
  password: any;

  constructor(private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorage,
    private appComponent: AppComponent,
    private userService: UserService) {
  }

  prijaviSe(): void {
    this.authService.attemptAuth(this.username, this.password)
      .subscribe(
        data => {
          TokenStorage.saveToken(data.token);
          TokenStorage.saveCurrentUser(this.username);
          this.appComponent.goToHomePage();
          this.appComponent.loggedUser = this.username;
          this.appComponent.isLoggedIn = true;
          this.appComponent.isAdmin = this.authService.isAdmin();
        },
        error => {
          console.error('Login failed...' + error);
          alert("Prijava nije uspjela. Pokušajte ponovo.");
          //  this.alert.open('Login failed. Wrong username or password!', null, { duration: 3000 });
        },
        () => {
          //          alert("Korisnik @" + this.username + " je uspješno prijavljen.");
          //this.alert.open('Login successful', null, { duration: 3000 });
        }
      );
  }

  keyDownFunction(event){
    if(event.keyCode == 13) {
      this.prijaviSe();
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(['/muzika']);
  }
}
