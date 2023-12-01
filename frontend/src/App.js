import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'

const App = () => {
    console.log('hello')
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
            </Routes>
        </Router>    
    )
}

export default App