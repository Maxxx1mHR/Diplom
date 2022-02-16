import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-single-equipment',
  templateUrl: './single-equipment.component.html',
  styleUrls: ['./single-equipment.component.css']
})
export class SingleEquipmentComponent implements OnInit {

  constructor(private service: EquipmentserviceService, private  router:ActivatedRoute) { }

  readData: any[];
  getparamid:any;

  ngOnInit(): void {
    this.getSingleEquip()
  }

  getSingleEquip(){
    console.log(this.router.snapshot.paramMap.get('id'),'IDDD');
    this.getparamid = this.router.snapshot.paramMap.get('id');
    this.service.getSingleEquip(this.getparamid).subscribe((res)=>{
      console.log(res,"res==>");
      this.readData = res.data;
    });
  }
}
