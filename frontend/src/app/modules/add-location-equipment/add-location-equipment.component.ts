import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';


@Component({
  selector: 'app-add-location-equipment',
  templateUrl: './add-location-equipment.component.html',
  styleUrls: ['./add-location-equipment.component.css']
})
export class AddLocationEquipmentComponent implements OnInit {


  constructor(private router: ActivatedRoute, private service: EquipmentserviceService) {
  }


  getparamid: any;
  test: any;
  operationList: any[];
  readData: any;
  readData1: any;
  successmsg:any;
  errormsg: any;

  public exampleData: Array<Select2OptionData>;
  public options: Options;

  ngOnInit(): void {


    this.getparamid = this.router.snapshot.params.id;

    //Для тест1
    /*    this.getparamid = this.activatedRoute.snapshot.params.id;
        console.log('operationList', this.operationList)
        this.api.getOperationList()
          .subscribe({
            next: _items => {
              this.operationList = _items;
              console.log('operationList', this.operationList)
            }
          })

    /*    this.service.getTypeEquip().subscribe({
          next: _item =>{
            this.readData = _item;
            console.log(this.readData, 'Типы оборудования')
          }
        });*/

    this.getTypeOparation()
    this.getStaff()
    this.createLocationEquip()

  }


  //Это выводится нужно для html для выпадающего списка типы оборудования
  getTypeOparation() {
    this.service.getTypeOperation().subscribe((res) => {
      console.log(res, "Типы оборудования");
      this.readData = res.data;
    });
  }

  //Это выводится в html для выпадающего списка. Получаем всех пользователей
  getStaff() {
    this.service.getStaff().subscribe((res) => {
      this.readData1 = res.data;
    });
  }

  LocationForm: FormGroup = new FormGroup({
    'date': new FormControl('', Validators.required),
    'id_type_of_operation': new FormControl('', Validators.required),
    'id_staff': new FormControl('', Validators.required),


  });


  createLocationEquip(){
    if(this.LocationForm.valid)
    {
      console.log(this.LocationForm.value)
      this.service.CreateLocationEquipment(this.LocationForm.value, this.getparamid).subscribe((res)=>{
        //this.LocationForm.reset();
        this.successmsg = res.message;
      });
    }
    else
    {
      this.errormsg = 'all field is required';
      //console.log('all field is required')
    }
  }


}

