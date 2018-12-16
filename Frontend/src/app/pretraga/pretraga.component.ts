import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../services/event/event.service';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private router: Router, private eventService: EventService, private authService: AuthService) { }

  events: Array<any>;
  modal_naziv: any;

  findByEvent: any;
  findByPlace: any;
  odabranaOpcijaPretrage: any;
  opcijePretrage = [{ id: 1, name: 'Događaj' }, { id: 2, name: 'Lokal' }];

  ngOnInit() {
  }

  pretraziEvente() {
    if (this.odabranaOpcijaPretrage == 1) {
      this.eventService.getByName(this.modal_naziv).subscribe(data => {
        this.events = data;
      });
    }
    if (this.odabranaOpcijaPretrage == 2) {
      this.eventService.getByNameOfPlace(this.modal_naziv).subscribe(data => {
        this.events = data;
      });
    }
    this.router.navigate(['/pretraga']);
  }

  prikaziDetalje(event: any) {
    var categoryId = event.category.id;
    if (categoryId == 1)
      this.router.navigate(['/muzika-detalji', event.id]);
    else if (categoryId == 2)
      this.router.navigate(['/sport-detalji', event.id]);
    else if (categoryId == 3)
      this.router.navigate(['/nauka-detalji', event.id]);
    else if (categoryId == 4)
      this.router.navigate(['/kultura-detalji', event.id]);
    else if (categoryId == 5)
      this.router.navigate(['/zabava-detalji', event.id]);
  }
}
