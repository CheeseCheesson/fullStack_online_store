const express = require('express')
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routers/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')



const PORT = process.env.PORT || 5001
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
/* errorHandler регистрируется в самом конце. Этот миддл веэр является замыкающим,
поэтому внутри него не вызывается функция next, поскольку на нём работа прекращается
 и мы возврааем на клиент ответ*/
    //обработка ошибок, последний middleware
app.use(errorHandler)


const startApp = async () => {
    try {
        await sequelize.authenticate() // устанавливается подключение к базе данных
        await sequelize.sync() // сверяет состояние базы данных со схемой данных, которые описаны нами
        app.listen(PORT, console.log("Работает на " + PORT + " порту"))
    } catch (e) {
        console.log("Ошибка подключения: " + e.message)
    }
}

startApp()