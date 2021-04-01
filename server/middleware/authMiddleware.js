//раскодировка токена
const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    if(req.method === "OPTIONS"){
        next()
        // нас интересует только post get put 
    }
    try {
        // передаём сначала тип токена, а потом сам токен, поэтому
        // по сепаратору "пробел" нужно 2 этох выражения отсоединить
        // просто выцепляем токен по первому индексу
        const token = req.headers.authorization.split(' ')[1] // bearer-это тип токена asdasdasdas - сам токен
        if(!token){
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
        // если токен есть, то его нужно раскодировать c помощью функции veryfy
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        //вызываем следующий в цепочке middleware
        next()
    } catch (e) {
        res.status(401).json({message: 'Пользователь не авторизован'})
    }
}