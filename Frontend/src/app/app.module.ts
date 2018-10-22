import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MuzikaComponent } from './muzika/muzika.component';
import { RouterModule, Routes } from '@angular/router';
import { KulturaComponent } from './kultura/kultura.component';
import { SportComponent } from './sport/sport.component';
import { ZabavaComponent } from './zabava/zabava.component';
import { NaukaComponent } from './nauka/nauka.component';
import { NaukaDetaljiComponent } from './nauka-detalji/nauka-detalji.component';
import { SportDetaljiComponent } from './sport-detalji/sport-detalji.component';
import { ZabavaDetaljiComponent } from './zabava-detalji/zabava-detalji.component';
import { KulturaDetaljiComponent } from './kultura-detalji/kultura-detalji.component';
import { MuzikaDetaljiComponent } from './muzika-detalji/muzika-detalji.component';
import { AdminLokacijaComponent } from './admin-lokacija/admin-lokacija.component';
import { PlaceService } from './services/place/place.service';
import { EventService } from './services/event/event.service';
import { AdminUseriComponent } from './admin-useri/admin-useri.component';
import { AdminEventsComponent } from './admin-events/admin-events.component';
import { UserDetaljiComponent } from './user-detalji/user-detalji.component';
import { LoginComponent } from './login/login.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { Interceptor } from './core/interceptor';
import { TokenStorage } from './core/token.storage';
import { AuthService } from './core/auth.service';
import { AuthGuard } from './core/auth.guard';
import { UserService } from './services/user/user.service';
import { ProfilComponent } from './profil/profil.component';
import { AdminKategorijeComponent } from './admin-kategorije/admin-kategorije.component';
import { PretragaComponent } from './pretraga/pretraga.component';

const routes: Routes = [
  { path: '', redirectTo: 'muzika', pathMatch: 'full' },
  { path: 'muzika', component: MuzikaComponent, canActivate: [AuthGuard] },
  { path: 'kultura', component: KulturaComponent, canActivate: [AuthGuard] },
  { path: 'sport', component: SportComponent, canActivate: [AuthGuard] },
  { path: 'zabava', component: ZabavaComponent, canActivate: [AuthGuard] },
  { path: 'nauka', component: NaukaComponent, canActivate: [AuthGuard] },
  { path: 'kultura-detalji/:id', component: KulturaDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'nauka-detalji/:id', component: NaukaDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'zabava-detalji/:id', component: ZabavaDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'sport-detalji/:id', component: SportDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'muzika-detalji/:id', component: MuzikaDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'admin-lokacija', component: AdminLokacijaComponent, canActivate: [AuthGuard] },
  { path: 'admin-useri', component: AdminUseriComponent, canActivate: [AuthGuard] },
  { path: 'admin-events', component: AdminEventsComponent, canActivate: [AuthGuard] },
  { path: 'user-detalji/:idUser', component: UserDetaljiComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'admin-kategorije', component: AdminKategorijeComponent },
  { path: 'pretraga', component: PretragaComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MuzikaComponent,
    KulturaComponent,
    SportComponent,
    ZabavaComponent,
    NaukaComponent,
    NaukaDetaljiComponent,
    SportDetaljiComponent,
    ZabavaDetaljiComponent,
    KulturaDetaljiComponent,
    MuzikaDetaljiComponent,
    AdminLokacijaComponent,
    AdminUseriComponent,
    AdminEventsComponent,
    UserDetaljiComponent,
    LoginComponent,
    RegistracijaComponent,
    ProfilComponent,
    AdminKategorijeComponent,
    PretragaComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    HttpModule,
    FormsModule,
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
