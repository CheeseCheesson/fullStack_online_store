import {makeAutoObservable} from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            // времено поместим пару объектов, пока не делали запросы к серверу
            {id: 1, name: "Холодильник"},
            {id: 2, name: "Смартфон"},
            {id: 3, name: "Ноутбуки"},
            {id: 4, name: "Телевизоры"}
        ]
        this._brands = [
            // времено поместим пару объектов, пока не делали запросы к серверу
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"},
            {id: 3, name: "Nokia"},
            {id: 4, name: "Asus"},
            {id: 5, name: "Acer"}
        ]
        this._devices = [
            {id: 1, name: "Nokia 5", price: 12000, rating: 3, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 2, name: "Nokia 5", price: 13000, rating: 5, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 3, name: "Nokia 5", price: 16000, rating: 3, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 4, name: "Nokia 5", price: 128000, rating: 2, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 5, name: "Nokia 5", price: 128000, rating: 2, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 6, name: "Nokia 5", price: 128000, rating: 2, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 7, name: "Nokia 5", price: 128000, rating: 2, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
            {id: 8, name: "Nokia 5", price: 128000, rating: 2, img: "https://purposechurch.com/wp-content/uploads/2021/03/Rooted-HOMEPAGE-SQUARE.jpg"},
        ]
        // место для хранения выделенного типа
        this._selectedType = {}
        this._selectedBrand = {}

        makeAutoObservable(this)
    }

    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    // выделить тип при нажатии
    setSelectedType(type){
        this._selectedType = type
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }

    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}

