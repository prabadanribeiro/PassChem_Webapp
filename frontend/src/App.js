import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Link, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Topics from './pages/Topics'
import ErrorPage from './pages/ErrorPage'

export default function App() {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Root />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "",
              element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "topics",
                element: <Topics />,
            },
          ],
        }
      ])

    return (
        <div>
            <RouterProvider router={router} />
        </div> 
    )
}

const Root = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}
