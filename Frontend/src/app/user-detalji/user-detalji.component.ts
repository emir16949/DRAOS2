import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-user-detalji',
  templateUrl: './user-detalji.component.html',
  styleUrls: ['./user-detalji.component.css']
})
export class UserDetaljiComponent implements OnInit {

  user: any;
  id: any;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['idUser'];
    });
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    });
  }
}
