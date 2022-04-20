const Router = require ('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('login',"Логи не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 6").isLength({min:6})

    ], controller.registration)
router.post('/login', controller.login)
router.get('/staff')

module.exports =router
