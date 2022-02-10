import { TestBed } from '@angular/core/testing';

import { EquipmentserviceService } from './equipmentservice.service';

describe('EquipmentserviceService', () => {
  let service: EquipmentserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
