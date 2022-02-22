import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';


@Component({
  selector: 'app-add-location-equipment',
  templateUrl: './add-location-equipment.component.html',
  styleUrls: ['./add-location-equipment.component.css']
})
export class AddLocationEquipmentComponent implements OnInit {


  constructor(private router: ActivatedRoute, private service: EquipmentserviceService,) {
  }

  getparamid: any;
  operationList: any[];
  readData: any;
  readData1: any;


  public exampleData: Array<Select2OptionData>;
  public options: Options;

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
    this.getStaff()


    this.exampleData = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];

    this.options = {
      multiple: true,
      closeOnSelect: false,
      width: '300'
    };

  }


  getTypeOparation() {
    this.service.getTypeOperation().subscribe((res) => {
      console.log(res, "Типы оборудования");
      this.readData = res.data;
    });
  }

  getStaff() {
    this.service.getStaff().subscribe((res) => {
      this.readData1 = res.data;
    });
  }


  userForm: FormGroup = new FormGroup({
    'date': new FormControl('', Validators.required),
    'id_type_of_operation': new FormControl('', Validators.required),
    'id_staff': new FormControl('', Validators.required),
  });

}
