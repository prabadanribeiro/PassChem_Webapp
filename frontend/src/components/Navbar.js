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
    const shape = {
        display: isHome ? 'block' : 'none'
    }
    const vidOverlay = {
        display: isHome ? 'flex' : 'none'
    }

    return (
        <div className='hero' style={hero}>
            <video autoPlay loop muted playsInline className='planet-video'>
                <source src={bgvideo} type='video/mp4'/>
                {/*Free Stock Videos by <a href="http://www.videezy.com">Videezy</a>*/}
            </video>
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
                    <a className='button-anchor' href='#section2'>More</a>
                </div>
            </div>
            <div style={shape} class="custom-shape-divider-bottom-1705853581">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                </svg>
            </div>
            
        </div>
    )
}

