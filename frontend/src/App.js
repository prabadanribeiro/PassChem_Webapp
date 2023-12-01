import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Link, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import ErrorPage from './components/errors/ErrorPage'

export default function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<Root />}>
                <Route index element={<Home />} />
            </Route>
        )
    )

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
