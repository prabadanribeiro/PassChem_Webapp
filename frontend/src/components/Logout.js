import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Logout() {
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

    return (
        <div>
            { accessToken && refreshToken ? (<button onClick={logout} type='button'>Sign Out</button>) : []}
        </div>
    )
}