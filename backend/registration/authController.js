const {Staff} = require("./index");
const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator')

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
                const staff = new Staff({login, hasPassword})
                //staff.save()
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
                if (!user) {
                    return res.status(400).json({message: `Пользователь ${user} не найден`})
                }
                const validPassword = bcrypt.compareSync(password, user.password)
                //console.log(user.password)
                if(!validPassword){
                    return res.status(400).json({message: 'Введен неверный пароль'})
                }
            })

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Не удалось'})
        }
    }
}

    module.exports = new authController()