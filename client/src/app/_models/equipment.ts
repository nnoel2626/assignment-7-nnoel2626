// Create Equipment Model Class

export class Equipment {
  // properties
  public equipmentId: number;
  public name: string = '';
  public brand: string = '';
  public model: string = '';
  public serialNumber: number = 0;
  public price: number = 0;
  public imageUrl: string = '';


  constructor(equipmentId: number, name: string, brand: string, model: string, serialNumber: number, price: number, imageUrl: string) {

    //this.equipmentId = number;
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.serialNumber = serialNumber;
    this.price = price;
    this.imageUrl = imageUrl;
  }
}
