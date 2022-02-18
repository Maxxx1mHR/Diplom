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

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: EquipmentserviceService,
  ) {
  }

  getparamid: any;
  operationList: any[];

  ngOnInit(): void {
    this.getparamid = this.activatedRoute.snapshot.params.id;
    console.log('operationList', this.operationList)
    this.api.getOperationList()
      .subscribe({
        next: _items => {
          this.operationList = _items;
          console.log('operationList', this.operationList)
        }
      })
  }

  userForm: FormGroup = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobil': new FormControl('', Validators.required)
  });

}
