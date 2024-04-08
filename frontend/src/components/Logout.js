import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Logout() {
    const navigate = useNavigate()

    const logout = async (event) => {
        event.preventDefault()
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        navigate('/')
    }

    return (
        <button onClick={logout} type='button'>Sign Out</button>
    )
}
