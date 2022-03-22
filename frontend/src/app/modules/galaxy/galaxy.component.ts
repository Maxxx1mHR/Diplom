import {Component, Inject, OnInit} from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";


@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css']
})
export class GalaxyComponent implements OnInit {

  constructor(private service: EquipmentserviceService, public dialog: MatDialog) {

    this.getGalaxyEquip();

  }

  readData2: any;


  ngOnInit(): void {


  }

  getGalaxyEquip(){
    this.service.GalaxyGetAllEquip().subscribe((res)=>{
      console.log(res, "GalaxyGetAllEquip===>");
      this.readData2 = res.data.recordset;
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'

    });
  }




}
