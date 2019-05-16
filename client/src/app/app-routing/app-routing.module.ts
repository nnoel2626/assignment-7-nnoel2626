import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../home';
import { LoginComponent } from '../login';
import { RegisterComponent } from '../register';
import { AuthGuard } from '../_guards';

import { GalleryComponent } from '../gallery/gallery.component';
import { EquipmentComponent } from '../equipment/equipment.component';
import { EquipmentdetailsComponent } from '../equipmentdetails/equipmentdetails.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewequipmentComponent } from '../newequipment/newequipment.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment',
    component: EquipmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'equipment/:equipmentId',
    component: EquipmentdetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newEquipment',
    component: NewequipmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];



@NgModule({

  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  LoginComponent,
  RegisterComponent,

  GalleryComponent,
  EquipmentComponent,
  EquipmentdetailsComponent,
  NewequipmentComponent,
  AboutComponent,
  ContactComponent,
  NavbarComponent,
  AppComponent
  //   PageNotFoundComponent
]


