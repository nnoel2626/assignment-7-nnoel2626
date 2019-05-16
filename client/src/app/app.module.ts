import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// used to create fake backend
import { fakeBackendProvider } from './_helpers';
import { AlertService, AuthenticationService } from '@app/_services';
import { UserService, RentalShopService } from '@app/_services';

import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavbarComponent } from './navbar/navbar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { EquipmentComponent } from './equipment/equipment.component';
import { EquipmentdetailsComponent } from './equipmentdetails/equipmentdetails.component';

import { NewequipmentComponent } from './newequipment/newequipment.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';;
import { AppRoutingModule } from './app-routing/app-routing.module'


@NgModule({

  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    GalleryComponent,
    EquipmentComponent,
    EquipmentdetailsComponent,
    NewequipmentComponent,
    ContactComponent,
    AboutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],

  providers: [
    AuthenticationService,
    AlertService,
    RentalShopService,
    UserService,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
