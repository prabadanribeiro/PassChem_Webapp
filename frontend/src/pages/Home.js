import React from 'react'
import {Links} from 'react-router-dom'
import Navbar from '../components/Navbar'

const Home = () => {
    return (
        <div>
            <Navbar home={true}/>
        </div>
    )
}

export default Home