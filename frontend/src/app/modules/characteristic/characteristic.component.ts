import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-characteristic',
  templateUrl: './characteristic.component.html',
  styleUrls: ['./characteristic.component.css']
})
export class CharacteristicComponent implements OnInit {

  //readData: any
  getparamid: any
  test: any
  monitor: any


  constructor(private _http: HttpClient, private router: ActivatedRoute) { }

  ngOnInit(): void {

    this.getparamid = this.router.snapshot.parent.paramMap.get('id');

    let getid = this.router.snapshot.parent.paramMap.get('id');
    this._http.get('http://localhost:3000/get_id_type_of_equipment/' + `${getid}`).subscribe((res: any)=>{
      console.log(res, "123441251251251")
      this.test = res.data[0].id_type_of_equipment
      console.log(this.test, 'DATA')
    })

    this._http.get('http://localhost:3000/get_characteristic/'+`${getid}`).subscribe((res:any)=>{
      console.log(res)
      this.monitor = res.data
      console.log(this.monitor, "123")
    })

  }
}
