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

}

