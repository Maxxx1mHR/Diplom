import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: EquipmentserviceService, private router: Router) { }

  ngOnInit(): void {

    this.Login();

  }

  LoginForm : FormGroup = new FormGroup({
    "login": new FormControl('', Validators.required),
    "password": new FormControl('', Validators.required)
  })

  Login(){
    console.log(this.LoginForm.value);
    if(this.LoginForm.valid){
      this.service.getStaff().subscribe((res)=>{
        console.log(res.data);
        const user = res.data.find((a: any)=>{
          return a.login === this.LoginForm.value.login && a.password === this.LoginForm.value.password;
        });
        if(user){
          alert("Вход");
          this.LoginForm.reset();
          this.router.navigate(['/all-equipment']);
        }
        else alert("Пользователь не найден");
      })
    }
  }


}
