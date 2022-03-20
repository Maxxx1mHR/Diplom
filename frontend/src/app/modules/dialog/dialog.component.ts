import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  readData: any;

  constructor(private service: EquipmentserviceService) {


  }


  ngOnInit(): void {
    this.TypeEquip();

  }

  //Создать запрос в index.js по получению типа
  //Создать сервис

  TypeEquip(){
    this.service.getTypeEquip().subscribe((res) => {
      console.log(res, 'Type_of_equipment');
      this.readData = res.data;
    })
  }




}
