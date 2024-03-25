import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./components/Register.jsx";
import { Login } from "./components/Login.jsx";
import { NotFound } from "./components/NotFound.jsx";
import { Main } from "./components/Layout/Main.jsx";
import { AddPcForm } from "./components/AddPc/AddPcForm.jsx";
import { SinglePcPage } from "./components/SinglePcPage.jsx";
import { MyComputers } from "./components/MyComputers/MyComputers.jsx";
import { LoggedIn } from "./components/LoggedIn/LoggedIn.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/add-new-pc",
        element: <LoggedIn><AddPcForm/></LoggedIn>
    },
    {
        path: "pc/:id",
        element: <LoggedIn><SinglePcPage/></LoggedIn>
    },
    {
        path: "my-computers",
        element: <LoggedIn><MyComputers/></LoggedIn>,
    },
    {
        path: "*",
        element: <NotFound/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      {/*<App />*/}
  </React.StrictMode>,
)
