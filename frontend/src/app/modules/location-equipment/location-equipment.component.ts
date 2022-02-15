import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-location-equipment',
  templateUrl: './location-equipment.component.html',
  styleUrls: ['./location-equipment.component.css']
})
export class LocationEquipmentComponent implements OnInit {

  constructor(private service: EquipmentserviceService, private router: ActivatedRoute) {
  }

  getparamid: any;
  readData: any;

  ngOnInit(): void {
    this.getLocationEquip()
  }


  getLocationEquip() {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.service.getLocationEquip(this.getparamid).subscribe((res) => {
      this.readData = res.data;
    });
  }
}
