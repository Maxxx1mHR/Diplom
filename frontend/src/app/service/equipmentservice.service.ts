import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EquipmentserviceService {

  constructor(private _http: HttpClient) { }

  apiUrl = 'http://localhost:3000/all_equipment'

  //функция вывода информации об оборудовании
  getAllEquip():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

  getSingleEquip(id: any):Observable<any>
  {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }


  //Функция для вывода место нахождения оборудования
  apiUrl1 = 'http://localhost:3000/location_of_equipment'
  getLocationEquip(id: any): Observable<any>
  {
    let ids = id;
    return this._http.get(`${this.apiUrl1}/${ids}`);
  }

  apiUrl2 = 'http://localhost:3000/repair'

  getRepairEquip(id: any): Observable<any>
  {
    let ids = id;
    return this._http.get(`${this.apiUrl2}/${ids}`);
  }


}

