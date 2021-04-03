import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }
        // спомощью этой функции mobx будет следить за изменениями этих переменных
        // если изменить, то компоненты будут перендереваться
           // создать экшены. Эти функции изменяют состояния

    setIsAuth(bool){
        this._isAuth = bool
    }
    setUser(user){
        this._user = user
    }
    // создать getters, нужны, чтобы получать перемекнные из состояния
    // это computed функции, вызываются только в том случае, если переменные, которые используются в нутри, была изменена (оптимизация)
    get isAuth(){
        return this._isAuth
    }
    get user(){
        return this._user
    }
}

// работа с mobx
// _ - значит, что переменая изменяться не может по соглашению

