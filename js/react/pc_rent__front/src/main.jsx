import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Register } from "./components/Register.jsx";
import { Login } from "./components/Login.jsx";
import { NotFound } from "./components/NotFound.jsx";
import { Main } from "./components/Layout/Main.jsx";

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
