import axios from "axios";

// создать 2 инстанса

// $host - для обычных запросов, которые не требуют авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// $authHost - каждому запросу, автоматически будет подставляться хедер authtorization и туда будет добавляться токен
// интерцептор, это просто функция, которая параметрами принимает конфиг
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
// на запрос вешаем интерсептор, его можно повесить и на ответ
// он будет отрабатывать перед каждым запросом и подставять токен в header Authorization, так же как в POSTMAN
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}