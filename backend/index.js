const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql2');

const app = express();


app.use (cors());
app.use (bodyparser.json());



//database connection

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'diplom',
   port: 3306
});

//check database connection
db.connect(err=>{
   if(err){console.log(err,'database err');}
   console.log('database successful connect...');
})

//Вывод основной информаци об оборудовании:
//Тип, производитель, модель, сериный, инвентарный, дата поставки.

app.get('/all_equipment',(req,res)=>{

   //console.log('test');
   let qr = 'SELECT name_type_equipment, name_manufacturer, model, serial_number, inventory_number, delivery_date ' +
       'FROM all_equipment, type_of_equipment, manufacturer ' +
       'WHERE all_equipment.id_type_of_equipment = type_of_equipment.id ' +
       'AND all_equipment.id_manufacturer = manufacturer.id';

   db.query (qr,(err,result)=>{
      if (err){
         console.log(err,'err');
      }
      if (result.length>0)
      {
         res.send({message: 'main info equipment', data: result});
      }
   });
});

//Вывод основной информации одного оборудования по id
//Тип, производитель, модель, сериный, инвентарный, дата поставки.
app.get('/all_equipment/:id',(req,res)=>{

   //console.log(req.params.id,'get single data');
   let gId = req.params.id;
   let qr = 'SELECT name_type_equipment, name_manufacturer, model, serial_number, inventory_number, delivery_date ' +
       'FROM all_equipment, type_of_equipment, manufacturer ' +
       'WHERE all_equipment.id_type_of_equipment = type_of_equipment.id ' +
       'AND all_equipment.id_manufacturer = manufacturer.id AND all_equipment.id = '+gId+'';

   db.query(qr,(err,result)=>{
      if (err)
      {
         console.log(err, 'errs');
      }
      if(result.length>0)
      {
         res.send({message: 'single equipment data', data: result});
      }
      else
      {
         res.send(
             {
            message: 'data not found'
         });
      }
   });
});

//Вывод списка сотрудников
//ФИО, отдел и филиал
app.get('/staff',(req,res)=>{
   let qr ='SELECT family_name, name, dad_name, name_department, name_rnu ' +
       'FROM staff, departments, rnu' +
       ' WHERE staff.id_department = departments.id AND staff.id_rnu = rnu.id';

   db.query(qr,(err,result)=>{
      if(err)
      {
         console.log(err,'errs');
      }
      if(result.length>0)
      {
         res.send(
         {message: 'single equipment data', data: result});
      }
      else {
         res.send({message: 'data not found'});
      }
   });
});

//Вывод одного сотрудника по id
//ФИО, отдел и филиал
app.get('/staff/:id',(req,res)=>{

   let gId = req.params.id;
   let qr ='SELECT family_name, name, dad_name, name_department, name_rnu ' +
       'FROM staff, departments, rnu' +
       ' WHERE staff.id_department = departments.id AND staff.id_rnu = rnu.id AND staff.id = '+gId+'';

   db.query(qr,(err,result)=>{
      if(err)
      {
         console.log(err,'errs');
      }
      if(result.length>0)
      {
         res.send(
             {message: 'single equipment data', data: result});
      }
      else {
         res.send({message: 'data not found'});
      }
   });
});

//Вывод истории место нахождения движения оборудования.
//Серийный норме (возможно не нужно), дата, операция, филиал, отдел, ФИО.
app.get('/location_of_equipment',(req,res)=>{

   let gId = req.params.id;
   let qr = 'SELECT serial_number, date, name_operation, name_rnu, name_department, family_name, name, dad_name' +
       ' FROM all_equipment, location_of_equipment, type_of_operation, staff, rnu, departments' +
       ' WHERE all_equipment.id = location_of_equipment.id_all_equipment ' +
       'AND location_of_equipment.id_type_of_operation = type_of_operation.id' +
       ' AND location_of_equipment.id_staff = staff.id ' +
       'AND staff.id_rnu =rnu.id ' +
       'AND staff.id_department = departments.id ' +
       'AND all_equipment.id = '+gId+'';

   db.query(qr,(err,result)=>{
      if(err)
      {
         console.log(err,'errs');
      }
      if(result.length>0)
      {
         res.send(
             {message: 'single equipment data', data: result});
      }
      else {
         res.send({message: 'data not found'});
      }
   });
});


app.listen(3000,()=>{
   console.log('server running');
})