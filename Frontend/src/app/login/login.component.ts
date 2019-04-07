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
  error: any = "";
  success: any = false;

  constructor(private router: Router,
    private authService: AuthService,
    private tokenService: TokenStorage,
    private appComponent: AppComponent,
    private userService: UserService) {
  }

  prijaviSe(): void {
    if(!this.password)
      this.error = "* Šifra je obavezan unos.";

    if(!this.username){
      this.error = "* Korisničko ime je obavezan unos.";
    }

    if(this.error === ""){
      this.authService.attemptAuth(this.username, this.password)
        .subscribe(
          data => {
            TokenStorage.saveToken(data.token);
            TokenStorage.saveCurrentUser(this.username);
            this.success = true;
            setTimeout(() => {
              this.appComponent.goToHomePage();
              this.appComponent.loggedUser = this.username;
              this.appComponent.isLoggedIn = true;
              this.appComponent.isAdmin = this.authService.isAdmin();
            }, 2000);
          },
          error => {
            this.error = "* Korisničko ime ili lozinka nisu ispravni. Ponovite unos.";
            this.password = "";
          },
          () => {
            this.success = true;
            //          alert("Korisnik @" + this.username + " je uspješno prijavljen.");
            //this.alert.open('Login successful', null, { duration: 3000 });
          }
        );
    }
  }

  onChangeUsername(){
    this.error = "";
  }

  onChangePassword(){
    this.error = "";
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.prijaviSe();
    }
  }

  ngOnInit() {
    if (this.authService.isLoggedIn())
      this.router.navigate(['/muzika']);
  }
}
