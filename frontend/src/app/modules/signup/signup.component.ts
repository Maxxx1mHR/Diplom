import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: EquipmentserviceService) { }

  ngOnInit(): void {

    this.SignUpNewUser();

  }


  SignUpForm : FormGroup = new FormGroup({
    "family_name": new FormControl('', Validators.required),
    "name": new FormControl('',Validators.required),
    "dad_name": new FormControl('', Validators.required),
    "id_department": new FormControl('', Validators.required),
    "id_rnu": new FormControl('', Validators.required),
    "login": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required)
  })

  SignUpNewUser(){
    console.log(this.SignUpForm.value);
  }

}
