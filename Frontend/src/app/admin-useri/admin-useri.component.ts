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
  username_pretraga: any;
  isAdmin = true;
  isLoggedIn = true;

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
    this.userService.deleteUserById(user.id).subscribe(data => console.log(data));
  }

  pretragaUsername() {
    this.userService.getUserByUsername(this.username_pretraga).subscribe(data => {
      this.users = data;
    });
  }

  kreirajUsera(): void {

    this.korisnik.user_role.id = 2;
    this.userService.createUser(this.korisnik).subscribe(data => { });
    window.location.reload();
  }
}
