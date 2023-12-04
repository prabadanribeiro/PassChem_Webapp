import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar(props) {
    const background = props.home
    return (
        <div className="background">
            <nav className="navbar">
            <a className="logo"><img src="logo.png" alt="Pass Chem logo" className="logo-img"></img></a>
            <ul className="nav-items">
                <li>
                    <a className="nav-item">Home</a>
                </li>
                <li>
                    <a className="nav-item">About</a>
                </li>
                <li>
                    <a className="nav-item">Topics</a>
                </li>
            </ul>
            </nav>
        </div>
    )
}

