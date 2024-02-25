import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
// import { Test } from "./Components/Test.jsx";
// import { UsingState } from "./Components/UsingState/UsingState.jsx";
import { Books } from "./Components/BooksApi/Books.jsx";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { PageAboutUs } from "./Components/PageAboutUs/PageAboutUs.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Books/>,
    },
    {
        path: "about-us",
        element: <PageAboutUs/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      {/*<App />*/}
      {/*<Books/>*/}
      {/*<UsingState/>*/}
      {/*<Test/>*/}
  </React.StrictMode>,
)
