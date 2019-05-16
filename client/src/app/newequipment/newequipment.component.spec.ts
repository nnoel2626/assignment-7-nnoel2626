import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewequipmentComponent } from './newequipment.component';

describe('NewequipmentComponent', () => {
  let component: NewequipmentComponent;
  let fixture: ComponentFixture<NewequipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewequipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
