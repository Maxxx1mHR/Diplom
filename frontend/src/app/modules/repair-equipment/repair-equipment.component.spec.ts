import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairEquipmentComponent } from './repair-equipment.component';

describe('RepairEquipmentComponent', () => {
  let component: RepairEquipmentComponent;
  let fixture: ComponentFixture<RepairEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
