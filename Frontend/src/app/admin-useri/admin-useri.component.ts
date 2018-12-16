import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-admin-useri',
  templateUrl: './admin-useri.component.html',
  styleUrls: ['./admin-useri.component.css']
})
export class AdminUseriComponent implements OnInit {

  users: any;
  username_pretraga: any;
  isAdmin: boolean = true;
  isLoggedIn: boolean = true;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getAllUsers();
    this.isAdmin = this.authService.isAdmin();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log(data)
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
      console.log(data);
    });
  }
}
