import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    // имеет глобальное хранилище, и в любом месте нашего приложния мы можем получать из него данные
    const {user} = useContext(Context)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={SHOP_ROUTE}/>
        </Switch>
    );
});
export default AppRouter;

// При указании нескльих маршрутов, например перечня страничек,
// и если ни одни из этих маршрутов не отработает самый последний, который указан в этом свиче
// {/*1 импортируем массив с роутами, которые доступны только авторизованному пользователю*/}
// {/*2 делаем деструктуризаицю и вытаскиваем из объекта путь и компонент*/}
// {/*3 для каждого элемента массива мы отрисовываем роут, где указывам путь и компонент*/}
// {/*4 ключ exact говори о том, что ключ должен точно совпадать*/}
// {/*5 isAuth && authRoutes.map  - это проверка, авторизован пользователь или нет*/}