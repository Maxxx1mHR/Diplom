import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css']
})
export class GalaxyComponent implements OnInit {

  constructor(private service: EquipmentserviceService) {

    this.getGalaxyEquip();

  }

  readData2: any;


  ngOnInit(): void {
  }

  getGalaxyEquip(){
    this.service.GalaxyGetAllEquip().subscribe((res)=>{
      console.log(res, "res===>");
      this.readData2 = res.data.recordset;
    })
  }



}
