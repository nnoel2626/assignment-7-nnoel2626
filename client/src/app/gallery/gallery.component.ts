import { Component, OnInit } from '@angular/core';
import { RentalShopService } from '@app/_services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  providers: [RentalShopService]  // adding RentalShopService to 'providers' is what makes it a 'service'
})

export class GalleryComponent implements OnInit {

  // will be initialize to the length of equipmentList in ngOnInit
  numEquipment = 0;

  // Returns numPhotos - here simply to show that we can make
  //  a method call in a template expression
  getNumberOfEquipment() {
    return this.numEquipment;
  }

  // counter that will increment every time a upvote happens in a child component
  totalVotes: number = 0;
  // tracks photo most recently voted on
  mostRecentVotedOn: string = '';
  // bound to upvotedEvent of child components in app.component template
  handleUpvoted(e): void {
    console.log("app-component gets upvoted:" + e);
    this.totalVotes += 1;
    this.mostRecentVotedOn = e;
  }

  // Because it was added as a provider to this class in the decorator,
  //  Angular will initialize and pass a PhotoService object
  //  into the constructor. We have assigned it the local property name 'rentalShopService'
  constructor(private rentalShopService: RentalShopService) {
  }

  equipmentList = null;
  equipmentUrl = '';
  // runs when the component is fully set up, gets photo data from service

  ngOnInit() {
    this.updateEquipmentList();
    this.equipmentUrl = this.rentalShopService.equipmentUrl;
  }

  updateEquipmentList(): void {
    this.rentalShopService.listEquipment().subscribe((equipment) => {
      this.equipmentList = equipment;
      this.numEquipment = this.equipmentList.length;
    });
  }
}








