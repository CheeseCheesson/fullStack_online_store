const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest("Не корректный email или password"))
        }
        // проверить существует ли пользователь с таким email или паролем в системе
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        // если такого пользователя с таким email в системе нет
        // хешируем пароль и создаём нового пользователя
        // bcrypt.hash(пароль, колличество хеширований)
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
            // user.id ------>
        // для пользователя создаём корзину ------>
        const basket = await Basket.create({userId: user.id}) // <--------
        // создаём JWT джейсон веб токен
        // jwt.sign({пейлоад, id, email}, секретный ключ, опции(отвечает за то, сколько живёт токен))
        // const jwt = jwt.sign({id: user.id, email: user.email, role: user.role})
        // передат email и role на прямую
        const token = jwt.sign(
            {
                id: user.id, email, role
            },
            process.env.SECRET_KEY,

            {expiresIn: '24h'}
        )
        return res.json({token})
    }
    async login(req, res){

    }
    async check(req, res, next){
        const {id} = req.query

        if(!id){
           return next(ApiError.badRequest('Не задан ID'))
        }

        res.json(id)
    }

}

module.exports = new UserController()