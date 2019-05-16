import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RentalShopService } from '@app/_services';



@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css'],
  providers: [RentalShopService]
})
export class EquipmentComponent implements OnInit {

  // photo passed in from app-equipment tag of app.component
  @Input() equipment;
  // photo base url
  @Input() baseUrl;
  // upvotedEvent bound in app-equipment tag, will trigger a function in app,component
  @Output() upvotedEvent = new EventEmitter<string>();
  // counter of upvotes on this photo
  votes: number = 0;
  // flag for whether user has voted on this equipment in this session
  voted: boolean = false;

  constructor() {
  }

  // bound in equipment.component template to click of Upvote! button
  upvote(name): void {
    console.log(name);
    this.votes += 1;
    // don't let them vote this one up again
    this.voted = true;
    this.upvotedEvent.emit(name);
  }

  ngOnInit() {
    this.equipment.displayurl = this.baseUrl + this.equipment.imageurl;

  }

}
