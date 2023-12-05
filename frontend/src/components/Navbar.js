import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isHome }) {
    
    const background = {
        backgroundImage: isHome ? 'url("tumblr_12715cfd85836bf3fc9e7c908484a6ee_58300dd0_540.webp")' : 'none',
        backgroundColor: isHome ? 'none' : '#000000',
        height: isHome ? '500px' : 'none'
    }

    const height = {
        height: isHome ? 'none' : '80px'
    }

    return (
        <div style={background}>
            <nav style={height} className="navbar">
                <a className="logo"><img src="images/logo.png" alt="Pass Chem logo" className="logo-img"></img></a>
                <ul className="nav-items">
                    <li>
                        <Link className="nav-item" to={'/'}>
                            Home
                        </Link>
                    </li>
                    <li> 
                        <Link className="nav-item" to={'/about'}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-item" to={'/topics'}>
                            Topics
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

