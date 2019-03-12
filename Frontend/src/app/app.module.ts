import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { AdminLokacijaComponent } from './admin-lokacija/admin-lokacija.component';
import { AdminUseriComponent } from './admin-useri/admin-useri.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { Interceptor } from './core/interceptor';
import { TokenStorage } from './core/token.storage';
import { DetaljiEventaComponent } from './detalji-eventa/detalji-eventa.component';
import { LoginComponent } from './login/login.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { EventService } from './services/event/event.service';
import { PlaceService } from './services/place/place.service';
import { UserService } from './services/user/user.service';
import { SviEventiIzKategorijeComponent } from './svi-eventi-iz-kategorije/svi-eventi-iz-kategorije.component';
import { UserDetaljiComponent } from './user-detalji/user-detalji.component';

const routes: Routes = [
  { path: '', redirectTo: 'svi-eventi-iz-kategorije', pathMatch: 'full' },
  { path: 'svi-eventi-iz-kategorije', component: SviEventiIzKategorijeComponent },
  { path: 'detalji-eventa/:id', component: DetaljiEventaComponent },
  { path: 'admin-lokacija', component: AdminLokacijaComponent, canActivate: [AuthGuard] },
  { path: 'admin-useri', component: AdminUseriComponent, canActivate: [AuthGuard] },
  { path: 'admin-events', component: AdminEventsComponent, canActivate: [AuthGuard] },
  { path: 'user-detalji/:idUser', component: UserDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'pretraga', component: PretragaComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    AdminLokacijaComponent,
    AdminUseriComponent,
    AdminEventsComponent,
    UserDetaljiComponent,
    LoginComponent,
    RegistracijaComponent,
    ProfilComponent,
    PretragaComponent,
    DetaljiEventaComponent,
    SviEventiIzKategorijeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    PlaceService,
    EventService,
    UserService,
    AuthService,
    AuthGuard,
    TokenStorage,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
