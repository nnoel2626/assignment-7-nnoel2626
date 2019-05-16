import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { RentalShopService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-newequipment',
  templateUrl: './newequipment.component.html',
  styleUrls: ['./newequipment.component.css'],
  providers: [RentalShopService]
})
export class NewequipmentComponent implements OnInit {
  // When a new equipment is created, we'll send an event to the parent
  //  to refresh its equipmentList
  @Output() newEquipment = new EventEmitter();
  fileToUpload: File = null;
  // equipment object, bound to the form fields
  equipment: any = {}

  // will be used to clear this field later
  fileInputField = null;
  formData: void;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private rentalShopService: RentalShopService) { }

  // handleFileInput(target): void {
  //   this.fileToUpload = target.files.item(0);
  //   this.fileInputField = target;
  // }


  ngOnInit() { }

  // called onSubmit
  createEquipment(newequipmentForm): void {
    var postData = JSON.stringify(this.newEquipment);
    let formData = new FormData();
    formData.append("postData", postData);
    console.log(postData);
    this.rentalShopService.createEquipment(formData)
      .subscribe((result) => {
        this.newEquipment.emit();
        newequipmentForm.reset();
        this.router.navigate(['/gallery']);
      });

  }
}





