import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isHome }) {


    const bgvideo = isHome ? 'nebula.mp4' : ''
    
    const hero = {
        height: isHome ? '100vh' : '80px'
    }

    const navColor = {
        backgroundColor: isHome ? 'transparent' : '#000'
    }

    const vidOverlay = {
        display: isHome ? 'flex' : 'none'
    }

    return (
        <div className='hero' style={hero}>
            <div className='video-container'>
                <video autoPlay loop muted playsInline className='planet-video'>
                    <source src={bgvideo} type='video/mp4'/>
                    {/*Free Stock Videos by <a href="http://www.videezy.com">Videezy</a>*/}
                </video>
            </div>
            <nav className="navbar" style={navColor}>
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
            <div className='vid-overlay' style={vidOverlay}>
                <div className='overlay-content'>
                    <h1 className='vid-header'>Start Learning Chemistry</h1>
                    <p className='vid-subtext'>Disover an abundance of free resources</p>
                    <a className='button-anchor' href="#section2">More</a>
                </div>
            </div>   
        </div>
    )
}

