import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class EquipmentserviceService {

  constructor(private _http: HttpClient) {
  }

  apiUrl = 'http://localhost:3000/all_equipment'

  //функция вывода информации об всем оборудовании
  getAllEquip(): Observable<any> {
    return this._http.get('http://localhost:3000/all_equipment');
  }

  // getAllEquip(): Observable<any> {
  //  return this._http.get('http://localhost:3000/all_equipment');
  // var all_equipment = this._http.get('http://localhost:3000/all_equipment');
  // return this.getPageItems(all_equipment, page, itemPerPage);
  //}

  getCountAllEquip(): Observable<any> {
    return this._http.get('http://localhost:3000/all_equipmentCount')
  }


  //Функция вывода одного экземпляра оборудования
  getSingleEquip(id: any): Observable<any> {
    let ids = id;
    return this._http.get('http://localhost:3000/all_equipment' + `/${ids}`);
  }

  //Функция для вывода место нахождения оборудования
  getLocationEquip(id: any): Observable<any> {
    let ids = id;
    return this._http.get('http://localhost:3000/location_of_equipment' + `/${ids}`);
  }

  //Вывод информации о ремонте оборудования по id.
  getRepairEquip(id: any): Observable<any> {
    // let ids = id;
    return this._http.get('http://localhost:3000/repair' + `/${id}`);
  }

  //Для тест1
  /*  getOperationList(): Observable<any[]> {
      return of([1, 2, 3]
        .map(x => ({id: x, name: `Name ${x}`})))
        .pipe(delay(2000));
    }*/

  //Вывод информации о типе перемещения оборудования
  getTypeOperation(): Observable<any> {
    return this._http.get('http://localhost:3000/type_of_operation');
  }

  //Вывод пользователей, отдела и филиала
  getStaff(): Observable<any> {
    return this._http.get('http://localhost:3000/staff');
  }

  //Post. Добавить информацию о месте нахождения оборудования
  CreateLocationEquipment(data: any, id: any): Observable<any> {
    return this._http.post('http://localhost:3000/add-location-equipment' + `/${id}`, data);
  }

  //Post. Добавить информацию о ремонте
  CreateRepairEquip(data: any, id: any): Observable<any> {
    return this._http.post('http://localhost:3000/add-repair-equipment/' + `${id}`, data);
  }

  GalaxyGetAllEquip(): Observable<any> {
    return this._http.get('http://localhost:8080/galaxy_all_equipment');
  }

  /*  getCountAllEquip():Observable<any>{
  /!*    var all_equipment = this._http.get('http://localhost:3000/all_equipmentCount');
      return this.getPageItems(all_equipment, page, itemPerPage);
      *!/
      return this._http.get('http://localhost:3000/all_equipmentCount');

    }*/

  /*  private getPageItems(all_equipment: Observable<any>, page: number, itemPerPage: number): Observable<any>{
      return all_equipment.pipe(
        map(u=>{
          var startIndex = itemPerPage * (page-1);
          return u.slice(startIndex, startIndex+itemPerPage);
        }
        ));
    }*/

  getTypeEquip(): Observable<any> {
    return this._http.get('http://localhost:3000/type_of_equipment');
  }

  getManufacturer(): Observable<any> {
    return this._http.get('http://localhost:3000/manufacturer');
  }

  getGalaxySingleEquip(id: any): Observable<any>{
    return this._http.get('http://localhost:8080/galaxy_single_equipment/:id');
  }

  postEquipmentFromGalaxy(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/add_in_allequipment_from_galaxy', data);
  }

  postSignup(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/signup', data);
  }




}

