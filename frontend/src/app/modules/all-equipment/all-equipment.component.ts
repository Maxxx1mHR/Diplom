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

  ngOnInit(): void {
    this.getAllEquip()
  }

  getAllEquip(){
    this.service.getAllEquip().subscribe((res)=>{
      console.log(res, "res==>");
      this.readData = res.data;
    });
  }




}
