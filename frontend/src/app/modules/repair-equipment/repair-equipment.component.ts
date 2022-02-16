import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-repair-equipment',
  templateUrl: './repair-equipment.component.html',
  styleUrls: ['./repair-equipment.component.css']
})
export class RepairEquipmentComponent implements OnInit {


  constructor(private service: EquipmentserviceService, private router: ActivatedRoute) { }

  readData: any;
  getparamid: any;


  ngOnInit(): void {
    this.getRepairEqiup()
  }

  getRepairEqiup(){
    console.log(this.router.snapshot.parent.paramMap.get('id'), "REPAIR ID");
    this.getparamid = this.router.snapshot.parent.paramMap.get('id');
    this.service.getRepairEquip(this.getparamid).subscribe((res)=>
    {
      this.readData = res.data;
    });
  }

}
