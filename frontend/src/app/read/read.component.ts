import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../service/equipmentservice.service";
import {combineAll} from "rxjs/operators";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: EquipmentserviceService) { }

  readData: any;
  getparamid:any;

  ngOnInit(): void {
    this.getAllEquip()
  }

  getAllEquip(){
    this.service.getAllEquip().subscribe((res)=>{
      console.log(res, "res==>");
      this.readData = res.data;
    });
  }

  getSingleEquip(){
    this.service.getSingleEquip(this.getparamid).subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }



}
