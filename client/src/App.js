import React from "react"
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
// стартовать приложение
// npm start
function App() {
  return (
      // чтобы навигация по странице была возможна,  всё приложение нужно обернуть в BrowserRouter
    <BrowserRouter>
     <AppRouter />
    </BrowserRouter>
  );
}

export default App;
