const {Staff} = require("./index");
//import {Staff} from "./index";
const bodyparser = require('body-parser');
const express = require("express");
const cors = require("cors");
//const registration = require('./registration')
const app = express();
app.use(cors());
app.use(bodyparser.json());

class authController{

   async registration(req,res) {
       try {
           const login = req.body.login
           const password = req.body.password
           Staff.findOne({where: {login: login}}).then((candidate) => {
               if (candidate) {
                   return res.status(400).json('Ошибка уже существует')
               }
               //console.log("Пользователь добавлен")
               const staff = new Staff({login, password})
               staff.save()
               res.status(400).json({message: 'Пользователь добавлен'})
           })


       } catch (e) {
           console.log(e)
           res.status(400).json({message: 'Не удалось'})
       }

   }
}


module.exports = new authController()