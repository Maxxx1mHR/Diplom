import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {combineAll} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";


//const itemPerPage: number = 2;

@Component({
  selector: 'app-read',
  templateUrl: './all-equipment.component.html',
  styleUrls: ['./all-equipment.component.css']
})

export class AllEquipmentComponent implements OnInit {

  //public page: number;
  //public collectionSize: number;


  constructor(private service: EquipmentserviceService) {

    //this.page = 1;
    this.getAllEquip();
    this.getGalaxyEquip();

  }
  readData: any;
  readData2: any;

  ngOnInit(): void {
/*    this.getAllEquip();
    this.getGalaxyEquip();
    this.getCountAllEequip();*/
    //this.page = 1;

  }

//this.page, itemPerPage

  getAllEquip(){
    //this.page = 1;
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

/*  getCountAllEequip(){
    this.service.getCountAllEquip().subscribe((res)=>{
      console.log(res, "res123==>");
      this.readData3 = res.data[0].TEST;
      this.collectionSize = res.data[0].TEST;
    })
  }*/

  onPageChanged(pageNumber: number){
    console.log("page Changed" + pageNumber);

  }


}
