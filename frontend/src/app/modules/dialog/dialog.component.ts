import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  readData: any;
  readData2: any;
  getparamid: any;
  InventarySerialNumberForm : FormGroup;

  constructor(private service: EquipmentserviceService,
              private router: ActivatedRoute,
              private formBuilder: FormBuilder)
  {
    this.getparamid = this.router;

  }

  ngOnInit(): void {
    this.TypeEquip();
    this.Manufacturer();

    this.InventarySerialNumberForm = this.formBuilder.group({
      type_equipment : ['', Validators.required],
      manufacturer : ['', Validators.required],
      model : ['', Validators.required],
      inventary_number : ['', Validators.required],
      serial_number : ['', Validators.required]

    })



    //this.getparamid = this.router.snapshot.paramMap.get('id');
    //if(this.getparamid)

/*    {
      this.service.getGalaxySingleEquip(this.getparamid).subscribe((res)=>{
        console.log(res, 'getGalaxySingleEquip==>');
        console.log('Rounrt',this.router);
        this.InventarySerialNumberForm.patchValue({
          serial_number:res.data.recordset.serial_number,
          inventary_number:res.data.recordset.inventary_number,
        });
      });
    }*/

  }

/*  InventarySerialNumberForm : FormGroup = new FormGroup({
    'serial_number': new FormControl('',Validators.required),
    'inventary_number': new FormControl('',Validators.required),
  });*/

  //Создать запрос в index.js по получению типа
  //Создать сервис

  TypeEquip(){
    this.service.getTypeEquip().subscribe((res) => {
      console.log(res, 'Type_of_equipment');
      this.readData = res.data;
    })
  }

  Manufacturer(){
    this.service.getManufacturer().subscribe((res)=>{
      console.log(res,'Manufacturer');
      this.readData2 = res.data;
    })
  }






}
