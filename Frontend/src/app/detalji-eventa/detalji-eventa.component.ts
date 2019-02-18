import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { EventService } from '../services/event/event.service';
import { User } from '../services/user/User';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-detalji-eventa',
  templateUrl: './detalji-eventa.component.html',
  styleUrls: ['./detalji-eventa.component.css']
})
export class DetaljiEventaComponent implements OnInit {

  event: Event;
  eventId: any;
  loggedUser: any;
  user: User;

  constructor(
    private eventService: EventService,
    private router: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.eventId = id;
    this.getUserData();
    this.getEvent();
  }

  getUserData() {
    this.loggedUser = TokenStorage.getCurrentUser();
    this.userService.getByUsername(this.loggedUser).subscribe(data => {
      this.user = data;
    });
  }

  getEvent() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.eventId = id;
    this.eventService.getEvent(id).subscribe(data => {
      this.event = data;
    });
  }
}
