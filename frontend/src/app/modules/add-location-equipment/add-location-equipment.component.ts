import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-add-location-equipment',
  templateUrl: './add-location-equipment.component.html',
  styleUrls: ['./add-location-equipment.component.css']
})
export class AddLocationEquipmentComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: EquipmentserviceService,) {}

  getparamid: any;
  operationList: any[];
  readData: any;


  ngOnInit(): void {

    //Для тест1
/*    this.getparamid = this.activatedRoute.snapshot.params.id;
    console.log('operationList', this.operationList)
    this.api.getOperationList()
      .subscribe({
        next: _items => {
          this.operationList = _items;
          console.log('operationList', this.operationList)
        }
      })*/

/*    this.service.getTypeEquip().subscribe({
      next: _item =>{
        this.readData = _item;
        console.log(this.readData, 'Типы оборудования')
      }
    });*/
    this.getTypeOparation()

  }

  getTypeOparation(){
    this.service.getTypeOperation().subscribe((res)=>
    {
      console.log(res, "Типы оборудования");
      this.readData = res.data;
    });
  }


  userForm: FormGroup = new FormGroup({
    'id_type_of_equipment': new FormControl('', Validators.required),
    'id_manufacturer': new FormControl('', Validators.required),
    'model': new FormControl('', Validators.required),
    'serial_number': new FormControl('', Validators.required),
    'inventory_number': new FormControl('', Validators.required),
    'delivery_date': new FormControl('', Validators.required),
  });

}
