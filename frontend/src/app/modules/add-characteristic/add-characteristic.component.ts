import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-characteristic',
  templateUrl: './add-characteristic.component.html',
  styleUrls: ['./add-characteristic.component.css']
})
export class AddCharacteristicComponent implements OnInit {

  test: any
  getparamid: any

  constructor(private router: ActivatedRoute, private _http: HttpClient, private _router: Router) { }

  AddCharacteristic: FormGroup = new FormGroup({
    'model1': new FormControl('', Validators.required),
    'parameter1': new FormControl('',Validators.required),
    'model2': new FormControl('', Validators.required),
    'parameter2': new FormControl('',Validators.required),
    'model3': new FormControl('', Validators.required),
    'parameter3': new FormControl('',Validators.required),
    'model4': new FormControl('', Validators.required),
    'parameter4': new FormControl('',Validators.required),
    'model5': new FormControl('', Validators.required),
    'parameter5': new FormControl('',Validators.required),
    'model6': new FormControl('', Validators.required),
    'parameter6': new FormControl('',Validators.required),
    'model7': new FormControl('', Validators.required),
    'parameter7': new FormControl('',Validators.required)

  })



  ngOnInit(): void {

    //this.getparamid = this.router.snapshot.parent.paramMap.get('id');

    let getid = this.router.snapshot.paramMap.get('id')
    console.log(getid)
    this._http.get('http://localhost:3000/get_id_type_of_equipment/' + `${getid}`).subscribe((res: any)=>{
      console.log(res, "AllCharacteristik")
      this.test = res.data[0].id_type_of_equipment
      console.log(this.test, 'DATA')
    })

    //this.AddCharMonitor() //Если оставить, то будет срабаывать сразу при переходе на страницу, а не по кнопке click()

  }

  AddCharMonitor(){
    let getid = this.router.snapshot.paramMap.get('id')
    this._http.post('http://localhost:3000/add-characteristicMonitor/' + `${getid}`, this.AddCharacteristic.value).
    subscribe((res: any)=>{
        console.log(res, "AddCharMonitor")
        this._router.navigate(['/single-equipment/'+`${getid}` + '/characteristic'])
      })
  }

  AddCharMonoblock(){
    let getid = this.router.snapshot.paramMap.get('id')
    this._http.post('http://localhost:3000/add-characteristicMonoblock/' + `${getid}`, this.AddCharacteristic.value).
    subscribe((res: any)=>{
      console.log(res, "AddCharMonoblock")
      this._router.navigate(['/single-equipment/'+`${getid}`+ '/characteristic'])
    })
  }





}






