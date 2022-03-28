import {Component, Inject, OnInit} from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  readData: any;
  readData2: any;
  getparamid: any;
  InventarySerialNumberForm: FormGroup;

  constructor(private service: EquipmentserviceService,
              private router: ActivatedRoute,
              private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogDataForInputForm: any,
  ) {
    this.getparamid = this.router;

  }

  ngOnInit(): void {
    this.TypeEquip();
    this.Manufacturer();

    this.InventarySerialNumberForm = this.formBuilder.group({
      type_equipment: ['', Validators.required],
      manufacturer: ['', Validators.required],
      model: ['', Validators.required],
      inventory_number: ['', Validators.required],
      serial_number: ['', Validators.required]
    })

    //console.log(this.dialogDataForInputForm,'RRRR');
    //Для вставки данных из формы в диалоговое окно.
    if (this.dialogDataForInputForm) {
      this.InventarySerialNumberForm.controls['inventory_number'].setValue(this.dialogDataForInputForm.inventory_number);
      this.InventarySerialNumberForm.controls['serial_number'].setValue(this.dialogDataForInputForm.serial_number);
    }


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

  TypeEquip() {
    this.service.getTypeEquip().subscribe((res) => {
      console.log(res, 'Type_of_equipment');
      this.readData = res.data;
    })
  }

  Manufacturer() {
    this.service.getManufacturer().subscribe((res) => {
      console.log(res, 'Manufacturer');
      this.readData2 = res.data;
    })
  }

  addDataFromGalaxy() {
    //console.log(this.InventarySerialNumberForm.value);
    this.service.postEquipmentFromGalaxy(this.InventarySerialNumberForm.value).subscribe({
      next: (res) => {
        //alert("Данные добавлены");
        this.dialogRef.close();
        //this.dialogDataForInputForm.close;
      },
      error:()=>{
        alert("Ошибка");
      }
    })


  }
}
