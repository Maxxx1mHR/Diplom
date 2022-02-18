import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocationEquipmentComponent } from './add-location-equipment.component';

describe('AddLocationEquipmentComponent', () => {
  let component: AddLocationEquipmentComponent;
  let fixture: ComponentFixture<AddLocationEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocationEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLocationEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
