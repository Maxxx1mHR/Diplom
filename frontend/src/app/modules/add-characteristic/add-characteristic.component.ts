import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
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

  constructor(private router: ActivatedRoute, private _http: HttpClient) { }

  AddCharacteristic: FormGroup = new FormGroup({
    'model': new FormControl('', Validators.required),
    'parameter': new FormControl('',Validators.required)
  })


  ngOnInit(): void {

    //this.getparamid = this.router.snapshot.parent.paramMap.get('id');

    let getid = this.router.snapshot.paramMap.get('id')
    console.log(getid)
    this._http.get('http://localhost:3000/get_id_type_of_equipment/' + `${getid}`).subscribe((res: any)=>{
      console.log(res, "123441251251251")
      this.test = res.data[0].id_type_of_equipment
      console.log(this.test, 'DATA')
    })

    this.AddCharMonitor()

  }

  AddCharMonitor(){
    let getid = this.router.snapshot.paramMap.get('id')
    this._http.post('http://localhost:3000/add-characteristicMonitor/' + `${getid}`, this.AddCharacteristic.value)
      .subscribe((res: any)=>{
        console.log(res)
      })
  }





}






