import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEquipmentComponent } from './location-equipment.component';

describe('LocationEquipmentComponent', () => {
  let component: LocationEquipmentComponent;
  let fixture: ComponentFixture<LocationEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
