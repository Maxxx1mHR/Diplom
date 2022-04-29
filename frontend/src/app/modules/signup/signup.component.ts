import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private service: EquipmentserviceService, private router: Router) { }

  readData1: any;
  readData2: any;


  ngOnInit(): void {

    this.SignUpNewUser();
    this.getRnu()
    this.getDepartments()

  }


  SignUpForm : FormGroup = new FormGroup({
    "family_name": new FormControl('', Validators.required),
    "name": new FormControl('',Validators.required),
    "dad_name": new FormControl('', Validators.required),
    "id_rnu": new FormControl('', Validators.required),
    "id_department": new FormControl('', Validators.required),
    "login": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required)
  })

/*
  SignUpNewUser(){
    if(this.SignUpForm.valid){
      //console.log(this.SignUpForm.value);
      this.service.postSignup(this.SignUpForm.value).subscribe((res)=>{
        alert("Вы успешно зарегистированы");
        this.SignUpForm.reset();
        this.router.navigate(['/login']);
      });
    }
    else{
      if(this.SignUpForm.touched) alert("Все поля должны быть заполены");
    }
  }
*/

  SignUpNewUser(){
    if(this.SignUpForm.valid){
      //console.log(this.SignUpForm.value);
      this.service.postRegistration(this.SignUpForm.value).subscribe(()=>{
        alert("Вы успешно зарегистированы");
      this.SignUpForm.reset();
      this.router.navigate(['/login'])
      })
    }
    else{
      if(this.SignUpForm.touched) alert("Все поля должны быть заполены");
    }
  }

  getRnu() {
    this.service.getRnu().subscribe((res) => {
      console.log(res, "Филиалы");
      this.readData1 = res.data;
    });
  }

  getDepartments() {
    this.service.getDepartments().subscribe((res) => {
      console.log(res, "Отделы");
      this.readData2 = res.data;
    });
  }




}
