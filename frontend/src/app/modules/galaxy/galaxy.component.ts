import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {EquipmentserviceService} from "../../service/equipmentservice.service";
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogComponent} from "../dialog/dialog.component";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";


class Item {
  serialNumber: string;
}

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
  ArrMySQL: any [];
  ArrGalaxy: any [];
  ArrGalaxy2: any [];
  resultArr2: any [];
  resultArr1: any [];


  test: any[];



  ngOnInit(): void {
    this.getGalaxyAllEquip();
    this.getGalaxyEquip();


    const galaxyArray: Item[] = [1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
      id: i,
      name: `Galaxy name ${i}`,
      serialNumber: `serial-${i}`,
      inventoryNumber: `inv-${i}`
    } as Item));
    // здесь из базы данных MySQL
    const mysqlArray: Item[] = [4, 7, 8, 12, 13, 14, 15].map(i => ({
      id: i,
      name: `Mysql eq name ${i}`,
      serialNumber: `serial-${i}`,
      inventoryNumber: `inv-${i}`
    } as Item));

    // берем серийные номера уже использованных на странице AllEquipment
    const mysqlSerials: string[] = mysqlArray.map(i => i.serialNumber);
    // Результат. Фильтруем массив из галактики по принципу: серийного номера нет в массиве уже использванных на странице
    const resultArray: Item[] = galaxyArray.filter(i => !mysqlSerials.includes(i.serialNumber));
    console.log(resultArray);

  }

  getGalaxyEquip() {
    this.service.GalaxyGetAllEquip().subscribe((res) => {
      console.log(res, "GalaxyGetAllEquip===>");
      this.readData2 = res.data.recordset;

      this.ArrGalaxy = res.data.recordset;
      console.log("ArrG",this.ArrGalaxy)

      //this.ArrGalaxy2 = this.ArrGalaxy.map(i => i.serial_number);
      //console.log("ArrG2",this.ArrGalaxy2)

      this.service.getAllEquip().subscribe((res1) => {
        console.log(res1, "resAllEquip==>");

        this.ArrMySQL = res1.data;
        console.log("ArrMysql",this.ArrMySQL)

        this.resultArr1 = this.ArrMySQL.map(i=>i.serial_number);
        console.log("Res1",this.resultArr1);
        this.resultArr2 = this.ArrGalaxy.filter(i => !this.resultArr1.includes(i.serial_number));
        console.log("RES",this.resultArr2);
        /*        this.resultArr1 = this.ArrMySQL.map(i=>i.serial_number);


                this.resultArr2 = this.ArrGalaxy2.filter(i=>this.resultArr1.includes(i.serial_number));
        console.log("RES",this.resultArr2);*/

      });

    })

  }

  getGalaxyAllEquip() {
    this.service.GalaxyGetAllEquip()
      .subscribe({
        next: (res) => {
          console.log("Galaxy All Equipment", res);
          //this.readData2 = res.data.recordset
          this.dataSource = new MatTableDataSource(res.data.recordset);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
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
