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
            <div class="custom-shape-divider-bottom-1705890690">
                <svg className='shape' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
            
        </div>
    )
}

