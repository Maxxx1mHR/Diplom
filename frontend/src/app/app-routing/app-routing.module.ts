import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CreateComponent} from "../modules/create/create.component";
import {AllEquipmentComponent} from "../modules/all-equipment/all-equipment.component";
import {SingleEquipmentComponent} from "../modules/single-equipment/single-equipment.component";
import {LocationEquipmentComponent} from "../modules/location-equipment/location-equipment.component";


const equipment: Routes = [
  {path: 'location', component: LocationEquipmentComponent},
];


const routes: Routes = [
  {path: 'create' ,component:CreateComponent},
  {path: 'all-equipment', component:AllEquipmentComponent},
  {path: 'single-equipment/:id', component: SingleEquipmentComponent},
  {path: 'single-equipment/:id', component: SingleEquipmentComponent, children: equipment},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
