import { Component, OnInit } from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {combineAll} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Emitters} from "../../emitters/emitters";
import {HttpClient} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";


//const itemPerPage: number = 2;

@Component({
  selector: 'app-read',
  templateUrl: './all-equipment.component.html',
  styleUrls: ['./all-equipment.component.css']
})

export class AllEquipmentComponent implements OnInit {


  message = false
  //public page: number;
    public collectionSize: number;
    public test: number;

    totalLength: number;
    page: number =1;



  constructor(private service: EquipmentserviceService, private _http: HttpClient) {

    //this.test = 4

    //this.page = 1;
    this.getAllEquip();
    //this.getGalaxyEquip();
    this.getCountAllEequip();
    //this.test = this.collectionSize;

  }
  readData: any;
  readData2: any;
  readData3: any;
  searchData: any

  ngOnInit(): void {
/*    this.getAllEquip();
    this.getGalaxyEquip();
    this.getCountAllEequip();*/
    //this.page = 1;

  }

//this.page, itemPerPage

  getAllEquip(){
    //this.page = 1;
    this.service.getAllEquip().subscribe((res)=>{
      console.log(res, "resAllEquip==>");
      this.readData = res.data;
      this.totalLength = res.length;
      this.message = true
      Emitters.authEmitter.emit(true)
      //this.collectionSize = res.data[0].allCount;
    });

  }

/*  getGalaxyEquip(){
    this.service.GalaxyGetAllEquip().subscribe((res)=>{
      console.log(res, "res===>");
      this.readData2 = res.data.recordset;

    })
  }*/


  getCountAllEequip(){
    this.service.getCountAllEquip().subscribe((res)=>{
      console.log(res, "res123==>");
      this.readData3 = res.data[0].allCountEquip
      this.collectionSize = res.data[0].allCountEquip;
    })
  }


  onPageChanged(pageNumber: number){
    console.log("page Changed" + pageNumber);
  }

  SearchForm: FormGroup = new FormGroup({
    'search': new FormControl('', Validators.required)
  })

  Search(){
    this._http.post('http://localhost:3000/search_in_all_equipment', this.SearchForm.value).subscribe((res:any)=>{
      console.log(this.SearchForm.value)
      console.log(res, "SearchEquip")
      this.searchData = res.data
      console.log(this.searchData, '999')
    })
  }

  CleanSearch(){
    this.searchData = null
  }





}
