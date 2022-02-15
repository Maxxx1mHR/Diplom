import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateComponent } from './modules/create/create.component';
import { AllEquipmentComponent } from './modules/all-equipment/all-equipment.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";//Без этой фигни не выводились all-equipment work! и т.д.
import {HttpClientModule} from "@angular/common/http";
import {EquipmentserviceService} from "./service/equipmentservice.service";
import { SingleEquipmentComponent } from './modules/single-equipment/single-equipment.component';
import { LocationEquipmentComponent } from './modules/location-equipment/location-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    AllEquipmentComponent,
    SingleEquipmentComponent,
    LocationEquipmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Это тоже нужно импортировать для all-equipment work!
    HttpClientModule
  ],
  providers: [EquipmentserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
