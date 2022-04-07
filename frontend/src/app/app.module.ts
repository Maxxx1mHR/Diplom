import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

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
import  {NgxPaginationModule} from "ngx-pagination";
import { GalaxyComponent } from './modules/galaxy/galaxy.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './modules/dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { LoginComponent } from './modules/login/login.component';
import { SignupComponent } from './modules/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,

    AllEquipmentComponent,
    SingleEquipmentComponent,
    LocationEquipmentComponent,
    RepairEquipmentComponent,
    AddLocationEquipmentComponent,
    AddRepairEquipmentComponent,
    GalaxyComponent,
    DialogComponent,
    LoginComponent,
    SignupComponent,

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
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [EquipmentserviceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
