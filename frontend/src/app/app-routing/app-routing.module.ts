import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AllEquipmentComponent} from "../modules/all-equipment/all-equipment.component";
import {SingleEquipmentComponent} from "../modules/single-equipment/single-equipment.component";
import {LocationEquipmentComponent} from "../modules/location-equipment/location-equipment.component";
import {RepairEquipmentComponent} from "../modules/repair-equipment/repair-equipment.component";
import {AddLocationEquipmentComponent} from "../modules/add-location-equipment/add-location-equipment.component";
import {AddRepairEquipmentComponent} from "../modules/add-repair-equipment/add-repair-equipment.component";
import {GalaxyComponent} from "../modules/galaxy/galaxy.component";
import {LoginComponent} from "../modules/login/login.component";
import {SignupComponent} from "../modules/signup/signup.component";


const equipment: Routes = [
  {path: 'location', component: LocationEquipmentComponent},
  {path: 'repair', component: RepairEquipmentComponent},
];


const routes: Routes = [
  {path: 'all-equipment', component:AllEquipmentComponent},
  {path: 'single-equipment/:id', component: SingleEquipmentComponent},
  {path: 'single-equipment/:id', component: SingleEquipmentComponent, children: equipment},
  {path: 'single-equipment/:id', component: SingleEquipmentComponent, children: equipment},
  {path: 'add-location-equipment/:id', component: AddLocationEquipmentComponent},
  {path: 'add-repair-equipment/:id', component: AddRepairEquipmentComponent},
  {path: 'galaxy', component: GalaxyComponent},
  {path: 'galaxy/:id', component: GalaxyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
