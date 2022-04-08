import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-add-repair-equipment',
  templateUrl: './add-repair-equipment.component.html',
  styleUrls: ['./add-repair-equipment.component.css']
})
export class AddRepairEquipmentComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: EquipmentserviceService) {
  }

  getparamid: any;
  successmsg: any;
  errormsg: any;


  ngOnInit(): void {

    this.getparamid = this.router.snapshot.params.id;
    this.CreateRepairEquip();

  }


  RepairEquip: FormGroup = new FormGroup({
    'repair_date': new FormControl('', Validators.required),
    'price': new FormControl('', Validators.required),
    'type_of_work': new FormControl('', Validators.required)
  });

  CreateRepairEquip(){
    if(this.RepairEquip.valid)
    {
      console.log(this.RepairEquip.value)
      this.service.CreateRepairEquip(this.RepairEquip.value, this.getparamid).subscribe((res)=>{
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
