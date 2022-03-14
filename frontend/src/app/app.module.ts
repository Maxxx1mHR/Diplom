import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CreateComponent} from './modules/create/create.component';
import {AllEquipmentComponent} from './modules/all-equipment/all-equipment.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";//Без этой фигни не выводились all-equipment work! и т.д.
import {HttpClientModule} from "@angular/common/http";
import {EquipmentserviceService} from "./service/equipmentservice.service";
import {SingleEquipmentComponent} from './modules/single-equipment/single-equipment.component';
import {LocationEquipmentComponent} from './modules/location-equipment/location-equipment.component';
import {RepairEquipmentComponent} from './modules/repair-equipment/repair-equipment.component';
import {AddLocationEquipmentComponent} from './modules/add-location-equipment/add-location-equipment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelect2Module} from 'ng-select2';
import { AddRepairEquipmentComponent } from './modules/add-repair-equipment/add-repair-equipment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    AllEquipmentComponent,
    SingleEquipmentComponent,
    LocationEquipmentComponent,
    RepairEquipmentComponent,
    AddLocationEquipmentComponent,
    AddRepairEquipmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Это тоже нужно импортировать для all-equipment work!
    HttpClientModule,
    ReactiveFormsModule,
    NgSelect2Module,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [EquipmentserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
