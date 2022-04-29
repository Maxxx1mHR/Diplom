import {Component, EventEmitter, OnInit} from '@angular/core';
import {Emitters} from "../../emitters/emitters";
import {EquipmentserviceService} from "../../service/equipmentservice.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated = false

  constructor(private service: EquipmentserviceService) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticated = auth
      }
    )
  }

  logout(){
    this.service.postLogout({}).subscribe(()=>{
      this.authenticated = false
    })
  }

}
