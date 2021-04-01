import {makeAutoObservable} from "mobx"

export default class DeviceStore {
    constructor() {
        this._types = [
            // времено поместим пару объектов, пока не делали запросы к серверу
            {id: 1, name: "Холодильник"},
            {id: 2, name: "Смартфон"}
        ]
        this._brands = [
            // времено поместим пару объектов, пока не делали запросы к серверу
            {id: 1, name: "Samsung"},
            {id: 2, name: "Apple"}
        ]
        this._devices = [
            {id: 1, name: "5", price: 12000, rating: 5, img: "2e171e8c-a985-483c-943d-852d2848d2a0.jpg"},
            {id: 2, name: "5", price: 12000, rating: 5, img: "2e171e8c-a985-483c-943d-852d2848d2a0.jpg"},
            {id: 3, name: "5", price: 12000, rating: 5, img: "2e171e8c-a985-483c-943d-852d2848d2a0.jpg"},
            {id: 4, name: "5", price: 12000, rating: 5, img: "2e171e8c-a985-483c-943d-852d2848d2a0.jpg"}
        ]
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

    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
}

