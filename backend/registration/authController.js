/*
const {Staff} = require("./index");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secret} = require("./config")

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secret)
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const login = req.body.login
            const password = req.body.password
            Staff.findOne({where: {login: login}}).then((candidate) => {
                if (candidate) {
                    return res.status(400).json({message: 'Ошибка уже существует'})
                }
                //console.log("Пользователь добавлен")
                //Добавить синхронизацию с БД???
                const hasPassword = bcrypt.hashSync(password, 10)
                const staff = new Staff({login, password: hasPassword})
                staff.save()
                res.status(400).json({message: 'Пользователь добавлен'})
            })

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Не удалось'})
        }
    }

    async login(req, res) {
        try {
            const login = req.body.login
            const password = req.body.password
            Staff.findOne({where: {login: login}}).then((user) => {
                console.log(password)
                console.log(user)
                if (!user) {
                    return res.status(400).json({message: `Пользователь ${user} не найден`})
                }
                const validPassword = bcrypt.compareSync(password, user.password)
                console.log(password)
                console.log(user.password)
                if (!validPassword) {
                    return res.status(400).json({message: 'Введен неверный пароль'})
                }
                const token = generateAccessToken(user.id)

                res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000 //1 day
                })
                res.send({message: 'Успешно'})
                //return res.json({token})
            })

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Не удалось'})
        }
    }

    async getStaff(req, res) {
        try {
            const cookie = req.cookies['jwt']
            const claims = jwt.verify(cookie, secret)
            console.log(claims)
            if (!claims) {
               return  res.status(400).json({message: 'Пользователь не авторизован'})
            }
            const user = await Staff.findOne({where: {id: claims.id}}).then((user) => {
                return res.send(claims)
                const {password, ...data} = user.toJSON() //Эта штука удаляет пароль из запроса и мы получаем данные без password в res.
                return res.send(data)  //можно было вставить user но тогда было бы поле password.
            })
        } catch (e) {
           return res.status(400).send({message: 'Пользователь не авторизован'})
        }
    }


    async logOut(req, res) {
        res.cookie('jwt', '', {maxAge: 0})
        res.send({
            message: 'Куки удалены'
        })
    }

}

module.exports = new authController()*/
