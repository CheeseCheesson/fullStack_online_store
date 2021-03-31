const { v4: uuidv4 } = require('uuid');
const path = require("path")
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, info, img: fileName})
            if(info) {
                // когда данные передаются через форм дату, они приходят в виде строки
                // поэтому мы этот массив будем парсить
                // на фронте в json строку, а на бэке - обратно перегонять в JS объект
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }
            return res.json(device)
        } catch (e) {
           next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res){
        // limit, page постраничный вывод
        // limit - это колличество девайсов, которые будут отображаться на одной странице
        let {brandId, typeId, limit, page} = req.query
        // дефолтные занчения. Если страница не указана, значит сделаем её первой
        page = page || 1
        // дефолтные занчения. Limit - это колличество девайсов, которые будут отображаться на одной странице
        limit = limit || 9
        // считаем отступ. Допустим, мы перешли на вторую страницу товаров и первые 9 страниц нужно пропустить
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            //
            // чтобы посчитать колличество страниц на фронте, нам надо знать общее колличество товаров
            // которое вернётся к нам по заданному вопросу,
            // пототому заменяем функцию findAll на findAndCountAll
            // findAndCountAll предназначена для пагинации
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(devices)
    }
    async   getOne(req, res){
        const {id} = req.params
        if(!id){
            next(ApiError.internal())
        }
        const device = await Device.findOne(
            {
                where: {id},
                /* получить массив характеристик
             запрос будет отрабатывать тогда, когда мы откроем страницу детельного просмотра
             того или иного устройства, поэтому характиристики хорошо подгружать сразу
             для этого используем поле include и затем указывается модель, которую мы хотим подгрузить
             и название поля, которое будет в этом объекте*/
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }

}

module.exports = new DeviceController()