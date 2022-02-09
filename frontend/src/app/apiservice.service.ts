import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http: HttpClient) { }

  apiUrl = 'http://localhost:3000/all_equipment'

  //функция вывода информации об оборудовании
  getAllEquip():Observable<any>
  {
    return this._http.get(`${this.apiUrl}`);
  }

}

