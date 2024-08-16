import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isHome }) {

    const MoreButtonScroll = (event) => {
        event.preventDefault()
        const section = document.getElementById('section2');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const bgvideo = isHome ? 'nebula.mp4' : ''
    
    const hero = {
        height: isHome ? '100vh' : '90px'
    }

    const navSpecs = {
        backgroundColor: isHome ? 'transparent' : '#000'
    }

    const vidOverlay = {
        display: isHome ? 'flex' : 'none'
    }

    return (
        <div className='hero' style={hero}>
            <div className='video-container'>
                <video autoPlay loop muted playsInline>
                    <source src={bgvideo} type='video/mp4'/>
                    {/*Free Stock Videos by <a href="http://www.videezy.com">Videezy</a>*/}
                </video>
            </div>
            <nav className="navbar" style={navSpecs}>
                <Link to={'/'}><img src="images/logo-light.png" alt="Pass Chem logo" className="logo-img"></img></Link>
                <ul>
                    <li> 
                        <Link className='nav-link' to={'/curriculum'}>
                            Curriculum
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-link' to={'/about'}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-link' to={'/login'}>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link className='nav-link' to={'/signup'}>
                            Sign Up
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className='vid-overlay' style={vidOverlay}>
                <div className='overlay-content'>
                    <h1>Start Learning Chemistry</h1>
                    <p>Discover an abundance of free resources</p>
                    <a href='#section2' onClick={MoreButtonScroll}>More</a>
                </div>
            </div>   
        </div>
    )
}

