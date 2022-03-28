import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-galaxy',
  templateUrl: './galaxy.component.html',
  styleUrls: ['./galaxy.component.css']
})
export class GalaxyComponent implements OnInit {


  displayedColumns: string[] = ['id', 'serial_number', 'inventory_number', 'function'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private service: EquipmentserviceService, public dialog: MatDialog, private router: ActivatedRoute) {

    //this.getGalaxyEquip();
    //console.log('PARAMS', router);

  }

  readData2: any;


  ngOnInit(): void {
    this.getGalaxyAllEquip();
    this.getGalaxyEquip();


  }

  getGalaxyEquip(){
    this.service.GalaxyGetAllEquip().subscribe((res)=>{
      console.log(res, "GalaxyGetAllEquip===>");
      this.readData2 = res.data.recordset;
    })
  }

  getGalaxyAllEquip(){
    this.service.GalaxyGetAllEquip()
      .subscribe({
        next: (res)=>{
          console.log("Galaxy All Equipment",res);
          //this.readData2 = res.data.recordset
          this.dataSource = new MatTableDataSource(res.data.recordset);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err)=>{
          alert("Can not get galaxy all equipment");
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: row

    });
  }




}
