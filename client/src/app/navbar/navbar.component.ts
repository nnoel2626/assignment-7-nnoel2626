import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService, AuthenticationService } from '@app/_services';
import { User } from '@app/_models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: User;
  @Input() title: string = "";

  constructor(
    private route: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.route.navigate(['/login']);
  }
}
