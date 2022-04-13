const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');

const mysql = require('mysql2');
const mssql = require('mssql');
const {compileETag} = require("express/lib/utils");
const Sequelize = require('sequelize');

const authRouter = require('./authRouter')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)


//const {router} = require("express/lib/application");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.urlencoded({extended: false}))

app.use("/auth", authRouter)

const appGalaxy = express();
appGalaxy.use(cors());
appGalaxy.use(bodyparser.json());

// создаем парсер для данных в формате json ТЕСТ
//const jsonParser = express.json();


const users = []

const sequelize = new Sequelize(
    'diplom',
    'root',
    'root',
    {
        dialect: 'mysql',
        host: 'localhost',
        define:{
            timestamps: false
        }
    }
)

sequelize
    .authenticate()
    .then(()=> console.log('Connecnted.'))
    .catch((err)=>console.erroe('Connection error: ', err))

//class staff extends Sequelize.Model{}

/*const Staff = sequelize.define('staffs',
    {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        family_name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        dad_name:{
            type: Sequelize.CHAR,
            allowNull: false
        },
        id_department:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        id_rnu:{
            type:Sequelize.INTEGER,
            allowNull: false
        },
        login:{
            type:Sequelize.CHAR,
            allowNull: true
        },
        password:{
            type:Sequelize.CHAR,
            allowNull: true
        }
    }
)*/



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
        //if (result.length > 0) {
        else  {

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
        /*        if (result.length > 0) {
                    res.send({message: 'main info equipment', data: result});
                }*/
       else {
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
    let qr = 'SELECT staff.id, family_name, name, dad_name, name_department, name_rnu, login, password ' +
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

app.get('/type_of_equipment', (req, res) => {

    let qr = `SELECT id, name_type_equipment FROM type_of_equipment`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err, 'errs');
        }
        /* if (result.length > 0) {
             res.send({message: 'get type_of_equipment', data: result});
         }*/
        if (result) {
            res.send({message: 'get type_of_equipment', data: result});
        }
    });
});

app.get('/manufacturer', (req, res) => {

    let qr = `SELECT id, name_manufacturer FROM manufacturer`;
    db.query(qr, (err, result) => {
        if (err, 'Error') {
            console.log(err, 'errs');
        }
        if (result) {
            res.send({
                message: 'get manufacturer',
                data: result
            });
        }
    });
});

appGalaxy.get("/galaxy_single_equipment/:id", function (req, res) {

    let gId = req.params.id;

    dbGalaxy.connect().then(function () {
        var request = new mssql.Request(dbGalaxy);
        request.query(`SELECT id, serial_number, inventory_number FROM all_equipment WHERE id = ${gId}`).then(function (resp) {
            res.send({
                message: 'single equipment data',
                data: resp,
            });
            console.log(resp.recordset);
            dbGalaxy.close();
        }).catch(function (err) {
            console.log(err);
            dbGalaxy.close();
        });
    }).catch(function (err) {
        console.log(err);
    });
});

app.post('/add_in_allequipment_from_galaxy',(req,res)=>{

    let id_type_of_equipment = req.body.type_equipment;  //возможно тут названия как из формы в компоненте dialog. ТУТ ТОЧНО НАЗВАНИЕ после = НАЗВАНИЯ ИЗ ФОРМЫ
    //Поэтому даже в body при запросе должны быть такие же названия как тут в форме, а не БД.
    let id_manufacturer = req.body.manufacturer;
    let model = req.body.model;
    let serial_number = req.body.serial_number;
    let inventory_number = req.body.inventory_number;

    let qr = `INSERT INTO all_equipment (id_type_of_equipment, id_manufacturer, model, serial_number, inventory_number) VALUES ('${id_type_of_equipment}', '${id_manufacturer}', '${model}', '${serial_number}', '${inventory_number}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"Не удалось вставить данные из галактики");
        }
        console.log((result, 'Данные добавление'));
        res.send({
            message: 'Данные добавлены',
        });
    });
});


/*app.post('/signup',(req,res)=>{

    let family_name = req.body.family_name;
    let name = req.body.name;
    let dad_name = req.body.dad_name;
    let id_department = req.body.id_department;
    let id_rnu = req.body.id_rnu;
    let login = req.body.login;
    let password = req.body.password;

    let qr = `INSERT INTO staff (family_name, name, dad_name, id_department, id_rnu, login, password) VALUES ('${family_name}','${name}','${dad_name}','${id_department}','${id_rnu}','${login}','${password}')`;

    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"Ошибка, не удалось добваить новго пользователя");
        }
        console.log((result,"Пользователь добавлен"));
        res.send({
            message: "Пользователь добавлен"
        });
    });
});*/


//Блок для регистрации

app.post('/signup',async (req,res)=>{
    try {
        let family_name = req.body.family_name;
        let name = req.body.name;
        let dad_name = req.body.dad_name;
        let id_department = req.body.id_department;
        let id_rnu = req.body.id_rnu;
        let login = req.body.login;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let qr = `INSERT INTO staff (family_name, name, dad_name, id_department, id_rnu, login, password) VALUES ('${family_name}','${name}','${dad_name}','${id_department}','${id_rnu}','${login}','${hashedPassword}')`;

        db.query(qr,(err,result)=> {
            if (err) {
                console.log(err, "Ошибка, не удалось добваить новго пользователя");
            }
            console.log((result, "Пользователь добавлен"));
            res.send({
                message: "Пользователь добавлен",
                data: result
            });
        });
    } catch {
        res.redirect('/signup');
    }
});








app.listen(3000, () => {
    console.log('server MySQL work');
})

appGalaxy.listen(8080, () => {
    console.log('server Galaxy work');
})

