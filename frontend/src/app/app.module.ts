import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";//Без этой фигни не выводились read work! и т.д.
import {HttpClientModule} from "@angular/common/http";
import {ApiserviceService} from "./apiservice.service";

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //Это тоже нужно импортировать для read work!
    HttpClientModule
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
