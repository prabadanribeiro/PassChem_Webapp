import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Logout() {
    const navigate = useNavigate()
    const [isGoogleApiLoaded, setIsGoogleApiLoaded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
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

    const buttonStyle = {
      height:'35px',
      width:'100px',
      fontFamily:'DM Sans',
      fontWeight:'600',
      fontSize:'18px',
      color: isHovered ? 'white' : 'hsl(208, 71%, 60%)',
      backgroundColor: isHovered ? 'hsl(208, 71%, 60%)' : 'white',
      border: '2px solid hsl(208, 71%, 60%)',
      borderRadius:'5px',
      transitionDuration:'0.4s'
    }

    return (
        <div>
            { accessToken && refreshToken ? (<button 
            style={buttonStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={logout} 
            type='button'
            >Sign Out</button>) : []}
        </div>
    )
}