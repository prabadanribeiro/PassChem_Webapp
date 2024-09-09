import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'

export default function Navbar({ isHome }) {

    const navigate = useNavigate()
    const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    useEffect(() => {
        const isLoggedInWithGoogle = Cookies.get('isLoggedInWithGoogle') === 'true'

        if (isLoggedInWithGoogle) {
            if (window.google) {
                setIsGoogleApiLoaded(true)
                return
            }
            const script = document.createElement('script')
            script.src = 'https://accounts.google.com/gsi/client'
            script.onload = () => {
                setIsGoogleApiLoaded(true)
            }
            document.body.appendChild(script)

            return () => {
                document.body.removeChild(script)
            }
        }
    }, [])

    const logout = async (event) => {
        event.preventDefault()
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        
        if (isGoogleApiLoaded) {
            window.google.accounts.id.disableAutoSelect()
            window.google.accounts.id.revoke(Cookies.get('user_email'), () => {
                Cookies.remove('isLoggedInWithGoogle')
                console.log('User logged out of Google')
                navigate('/')
            })
        } else {
            navigate('/')
        }
    }

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
                    { !(accessToken && refreshToken) ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <li>
                                <Link className='nav-link' to={'/profile'}>
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <button className='nav-link' onClick={logout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div className='vid-overlay' style={vidOverlay}>
                <div className='overlay-content'>
                    <h1>Learn Chemistry <br/>for <span style={{textDecoration: 'underline solid rgba(65, 97, 250, 0.7)  11px', textUnderlineOffset: '8px', textDecorationSkipInk: 'none'}}>Free</span></h1>
                    <p>Discover an abundance of high quality resources.</p> 
                    <a href='#section2' onClick={MoreButtonScroll}>More</a>
                </div>
            </div>   
        </div>
    )
}

