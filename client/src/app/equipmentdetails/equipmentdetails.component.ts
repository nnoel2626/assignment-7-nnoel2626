import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RentalShopService } from '@app/_services';


@Component({
  selector: 'app-equipmentdetails',
  templateUrl: './equipmentdetails.component.html',
  styleUrls: ['./equipmentdetails.component.css'],
  providers: [RentalShopService]
})
export class EquipmentdetailsComponent implements OnInit {

  // local equipmentObject fetched from RentalShopService
  equipment: any = {};

  // equipment image uri with server path prepended
  equipmentdisplayurl: string = '';

  // flag for edit mode
  editing: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private rentalShopService: RentalShopService) { }

  ngOnInit() {
    return this.getEquipment();
  }

  // bound to edit and cancel buttons in view
  setEditMode(mode): void {
    this.editing = (mode ? true : false);
  }
  //retreives route parameter and fetches data from data service
  getEquipment() {
    const param = this.route.snapshot.paramMap.get('equipmentId');
    this.rentalShopService.getEquipment(param)
      .subscribe((equipment) => {
        this.equipment = equipment;
        this.equipmentdisplayurl = this.rentalShopService.equipmentUrl + this.equipment.imageurl;
      });
  }

  //calls update from RentalShopService using data passed from ngForm.value
  updateEquipment(obj: any): void {
    this.equipment.name = obj.nameField;
    this.equipment.brand = obj.brandField;
    this.equipment.model = obj.modelField;
    this.equipment.serialNumber = obj.serialNumberField;
    this.equipment.price = obj.priceField;
    this.equipment.imageUrl = obj.imageUrlField;
    this.rentalShopService.updateEquipment(this.equipment._id, this.equipment)
      .subscribe((result) => {
        // location.reload();
        this.router.navigate(['/gallery']);
      });
  }

  // deletes a piece of equipment
  deleteEquipment() {
    if (confirm(`Are you sure you want to delete ${this.equipment.name}?`)) {
      console.log(`deleting ${this.equipment._id}`);
      this.rentalShopService.deleteEquipment(this.equipment._id)
        .subscribe((result) => {
          alert(`Equipment ${this.equipment.name} has been deleted`);
          this.router.navigate(['/gallery']);
        })
    }
  }

}
