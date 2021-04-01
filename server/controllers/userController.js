const ApiError = require("../error/ApiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        // роли по дефолту присваивается роль юзера, после создания аккаунта
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

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
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }
        /*
        Сверяем пароль, который ввёл пользователь с паролем БД
         */
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal("Указан не верный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        // функция герерирует новый токен и отправляет его обратно на клиент
        // если пользователь постоянно использует свой аккаунт то токен будет перезаписоваться
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

}

module.exports = new UserController()