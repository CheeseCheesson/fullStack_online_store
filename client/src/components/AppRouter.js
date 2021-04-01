// навигация по страницам
import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";


const AppRouter = () => {
    const isAuth = false
    return (
        // При указании нескльих маршрутов, например перечня страничек,
        // и если ни одни из этих маршрутов не отработает самый последний, который указан в этом свиче
        <Switch>
            {/*импортируем массив с роутами, которые доступны только авторизованному пользователю*/}
            {/*делаем деструктуризаицю и вытаскиваем из объекта путь и компонент*/}
            {/*для каждого элемента массива мы отрисовываем роут, где указывам путь и компонент*/}
            {/*ключ exact говори о том, что ключ должен точно совпадать*/}
            {/*isAuth && authRoutes.map  - это проверка, авторизован пользователь или нет*/}
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
};

export default AppRouter;