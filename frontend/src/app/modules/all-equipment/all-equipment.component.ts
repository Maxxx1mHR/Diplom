import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {combineAll} from "rxjs/operators";

@Component({
  selector: 'app-read',
  templateUrl: './all-equipment.component.html',
  styleUrls: ['./all-equipment.component.css']
})
export class AllEquipmentComponent implements OnInit {

  constructor(private service: EquipmentserviceService) { }

  readData: any;
  readData2: any;

  ngOnInit(): void {
    this.getAllEquip();
    this.getGalaxyEquip();
  }




  getAllEquip(){
    this.service.getAllEquip().subscribe((res)=>{
      console.log(res, "res==>");
      this.readData = res.data;
    });
  }

  getGalaxyEquip(){
    this.service.GalaxyGetAllEquip().subscribe((res)=>{
      console.log(res, "res===>");
      this.readData2 = res.data.recordset;
    })
  }

}
