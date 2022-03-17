const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const mysql = require('mysql2');
const mssql = require('mssql');
const {compileETag} = require("express/lib/utils");

//const {router} = require("express/lib/application");

const app = express();
app.use(cors());
app.use(bodyparser.json());

const appGalaxy = express();
appGalaxy.use(cors());
appGalaxy.use(bodyparser.json());

// создаем парсер для данных в формате json ТЕСТ
//const jsonParser = express.json();


//Соединение с базой данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'diplom',
    port: 3306
});

const dbGalaxy = new mssql.ConnectionPool({
    server: 'localhost',
    user: 'user1',
    password: 'sa',
    database: 'galaxy',
    port: 1433,
    trustServerCertificate: true,
})


//Проверка соединения с базой данных
db.connect(err => {
    if (err) {
        console.log(err, 'Соединеие с MySQL не удалось, ошибка');
    } else {
        console.log('Соединеие с MySQL успешно установлено...');
    }
});

//Проверка соединеиня с Галактикой

dbGalaxy.connect(err => {
    if (err) {
        console.log(err, 'Соединеие с Галактикой не удалось, ошибка');
    } else {
        console.log('Соединение c Галактикой успешно установлено');
    }
});

appGalaxy.get("/galaxy_all_equipment", function (req, res) {

    dbGalaxy.connect().then(function () {
        var request = new mssql.Request(dbGalaxy);
        request.query("select * from all_equipment").then(function (resp) {
            res.send({
                message: 'all user data',
                data: resp
            });
            console.log(resp);
            dbGalaxy.close();
        }).catch(function (err) {
            console.log(err);
            dbGalaxy.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
});


//Вывод основной информаци об оборудовании:
//Тип, производитель, модель, сериный, инвентарный, дата поставки.

app.get('/all_equipment', (req, res) => {

    //console.log('test');
    let qr = 'SELECT all_equipment.id,name_type_equipment, name_manufacturer, model, serial_number, inventory_number, delivery_date ' +
         'FROM all_equipment, type_of_equipment, manufacturer ' +
         'WHERE all_equipment.id_type_of_equipment = type_of_equipment.id ' +
         'AND all_equipment.id_manufacturer = manufacturer.id';


    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {}

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'err');
        }
        if (result.length > 0) {

/*            if (endIndex < result.length)
                results.next = {
                    page: page + 1,
                    limit: limit
                }

            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit
                }
            }*/

            //results.results = result.slice(startIndex, endIndex);

            res.send({message: 'main info equipment', data: result});
            //finalResult = result.slice(startIndex, endIndex);
            //res.send({message: 'main info equipment', data: finalResult});

        }
    });
});

//Тест по выводу количества элементов для страничной навигации
app.get('/all_equipmentCount', (req, res) => {

    //console.log('test');
    let qr = `SELECT COUNT (id) as allCountEquip FROM all_equipment`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'err');
        }
        if (result.length > 0) {
            res.send({message: 'main info equipment', data: result});
        }
    });
});

//Вывод основной информации одного оборудования по id
//Тип, производитель, модель, сериный, инвентарный, дата поставки.
app.get('/all_equipment/:id', (req, res) => {

    //console.log(req.params.id,'get single data');

    let gId = req.params.id;
    let qr = 'SELECT all_equipment.id, name_type_equipment, name_manufacturer, model, serial_number, inventory_number, delivery_date ' +
        'FROM all_equipment, type_of_equipment, manufacturer ' +
        'WHERE all_equipment.id_type_of_equipment = type_of_equipment.id ' +
        'AND all_equipment.id_manufacturer = manufacturer.id AND all_equipment.id = ' + gId + '';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send({message: 'single equipment data', data: result});
        } else {
            res.send(
                {
                    message: 'data not found'
                });
        }
    });
});

//Вывод списка сотрудников
//ФИО, отдел и филиал
app.get('/staff', (req, res) => {
    let qr = 'SELECT staff.id, family_name, name, dad_name, name_department, name_rnu ' +
        'FROM staff, departments, rnu' +
        ' WHERE staff.id_department = departments.id AND staff.id_rnu = rnu.id';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send(
                {message: 'single equipment data', data: result});
        } else {
            res.send({message: 'data not found'});
        }
    });
});

//Вывод одного сотрудника по id
//ФИО, отдел и филиал
app.get('/staff/:id', (req, res) => {

    let gId = req.params.id;
    let qr = 'SELECT family_name, name, dad_name, name_department, name_rnu ' +
        'FROM staff, departments, rnu' +
        ' WHERE staff.id_department = departments.id AND staff.id_rnu = rnu.id AND staff.id = ' + gId + '';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send(
                {message: 'single equipment data', data: result});
        } else {
            res.send({message: 'data not found'});
        }
    });
});

//Вывод истории место нахождения движения оборудования.
//Серийный норме (возможно не нужно), дата, операция, филиал, отдел, ФИО.
app.get('/location_of_equipment/:id', (req, res) => {

    let gId = req.params.id;
    let qr = 'SELECT all_equipment.id, serial_number, date, name_operation, name_rnu, name_department, family_name, name, dad_name' +
        ' FROM all_equipment, location_of_equipment, type_of_operation, staff, rnu, departments' +
        ' WHERE all_equipment.id = location_of_equipment.id_all_equipment ' +
        'AND location_of_equipment.id_type_of_operation = type_of_operation.id' +
        ' AND location_of_equipment.id_staff = staff.id ' +
        'AND staff.id_rnu =rnu.id ' +
        'AND staff.id_department = departments.id ' +
        'AND all_equipment.id = ' + gId + '';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send(
                {message: 'single equipment data', data: result});
        } else {
            res.send({message: 'data not found'});
        }
    });
});

//Вывод истории ремонта оборудования
//Дата ремонта, цена, что было сделано
app.get('/repair/:id', (req, res) => {

    let gId = req.params.id;
    let qr = 'SELECT repair_date, price, type_of_work FROM repair_of_equipment, all_equipment ' +
        'WHERE repair_of_equipment.id_all_equipment = all_equipment.id ' +
        'AND repair_of_equipment.id_all_equipment = ' + gId + '';

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        if (result.length > 0) {
            res.send(
                {message: 'repair equipment data', data: result});
        } else {
            res.send({message: 'data not found'});
        }
    });
});

//Вывод типа операции перемещения
app.get('/type_of_operation', (req, res) => {

    let qr = 'SELECT id, name_operation FROM type_of_operation'

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'err');
        }
        if (result.length > 0) {
            res.send({message: 'main info equipment', data: result});
        }
    });
});

//Добавление нового место нахождения оборудования
app.post('/add-location-equipment/:id', (req, res) => {

    console.log(req.body, 'updatedata');
    let gId = req.params.id;
    let date = req.body.date;
    let id_type_of_operation = req.body.id_type_of_operation;
    let id_staff = req.body.id_staff;

    let qr = `INSERT INTO location_of_equipment (date, id_type_of_operation, id_staff, id_all_equipment) VALUES ('${date}','${id_type_of_operation}','${id_staff}','${gId}')`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        console.log(result, 'result')
        res.send({
            message: 'insert location of equipment',
        });
    });
});

app.post('/add-repair-equipment/:id', (req, res) => {

    console.log(req.body, 'updatedata');
    let gId = req.params.id;
    let repair_date = req.body.repair_date;
    let price = req.body.price;
    let type_of_work = req.body.type_of_work;

    let qr = `INSERT INTO repair_of_equipment (repair_date, price, type_of_work, id_all_equipment) VALUES ('${repair_date}','${price}','${type_of_work}','${gId}')`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        console.log(result, 'result')
        res.send({
            message: 'insert repair of equipment',
        });
    });
});


function paginatedResults(model) {
    return (req, res, next) => {

    }
}


app.listen(3000, () => {
    console.log('server MySQL work');
})

appGalaxy.listen(8080, () => {
    console.log('server Galaxy work');
})

