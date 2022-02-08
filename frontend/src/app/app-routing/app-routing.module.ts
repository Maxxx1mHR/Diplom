import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule, Routes} from "@angular/router";
import {CreateComponent} from "../create/create.component";
import {ReadComponent} from "../read/read.component";

const routes: Routes = [
  {path: 'create' ,component:CreateComponent},
  {path: 'read', component:ReadComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
