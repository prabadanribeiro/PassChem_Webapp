import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isHome }) {


    const bgvideo = isHome ? 'planet.mp4' : ''
    
    const vidoverlay = {
        display: isHome ? 'block' : 'none'
    }

    const height = {
        height: isHome ? 'none' : '80px'
    }

    return (
        <div className='hero'>
            <video autoPlay muted playsInline className='planet-video'>
                <source src={bgvideo} type='video/mp4'/>
            </video>
            <nav style={height} className="navbar">
                <a className="logo"><img src="images/logo-light.png" alt="Pass Chem logo" className="logo-img"></img></a>
                <ul>
                    <li className="nav-item">
                        <Link className='nav-link' to={'/'}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item"> 
                        <Link className='nav-link' to={'/about'}>
                            About
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to={'/topics'}>
                            Topics
                        </Link>
                    </li>
                </ul>
            </nav>
            <h1 style={vidoverlay} className='video-overlay'><span className='greeting'>Welcome</span>,<br/>to the World of <span className='blue-gradient'>Chemistry</span></h1>
        </div>
    )
}

