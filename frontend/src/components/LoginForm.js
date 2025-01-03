import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config/Config'
import api from '../services/AxiosServices'
import '../styles/Login.css'

function loadGoogleScript() {
    
    const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
        if (existingScript) {
            return Promise.resolve()
        }

    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = 'https://accounts.google.com/gsi/client'
        script.onload = () => resolve()
        document.body.appendChild(script)
    })
}

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    function handleCallbackResponse(response) {

        const loginUrl = 'api/users/google-login/'

        const tokenPayload = {
            token: response.credential,
        }
    
        api.post(loginUrl, tokenPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            const tokens = response.data
            Cookies.set('access_token', tokens.access_token)
            Cookies.set('refresh_token', tokens.refresh_token)
            setIsAuthenticated(true)
            navigate("/")
        })
        .catch(error => {
            console.error('Error logging in with Google:', error.response ? error.response.data : error.message)
            if (error.response && error.response.data === 'User not found') {
                console.error('User not found. Please sign up.')
            }
        })
    }

    useEffect(() => {
        
        const accessToken = Cookies.get('access_token')
        const refreshToken = Cookies.get('refresh_token')

        if (accessToken && refreshToken) {
            setIsAuthenticated(true)
        }
    }, [])

    useEffect(() => {
        loadGoogleScript().then(() => {

            const clientId = config.REACT_APP_GOOGLE_CLIENT_ID

            if (!clientId) {
                console.error('Google Client ID not found. Make sure REACT_APP_GOOGLE_CLIENT_ID is set in your .env file.');
                return
            }

            google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCallbackResponse,
            })

            google.accounts.id.renderButton(
                document.getElementById('GoogleSignIn'),
                { theme: 'outline', size: 'large', type: 'icon' }
            )
        })
    }, [])

    const submit = async (event) => {

        event.preventDefault()
        
        const user = {
            email : email,
            password: password,
        }

        try {
            const {data} = await api.post("api/users/login/", user)
            Cookies.set('access_token', data.access_token)
            Cookies.set('refresh_token', data.refresh_token)
            setIsAuthenticated(true)

            navigate("/")
        }
        catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                setErrorMessage('Incorrect username or password.')
            } else {
                setErrorMessage('An error occurred. Please try again later.')
            }
        }
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <div className='login-hero'>
            <form onSubmit={submit}>
                <h3>Login to PassChem</h3>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <div className='form-input'>
                    <label>Email</label>
                    <input
                        placeholder="Email address" 
                        name='email'  
                        type='email' 
                        value={email}
                        required 
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-input'>
                    <label>Password</label>
                    <input 
                        name='Password' 
                        type="password"     
                        placeholder="Enter password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                <div id='GoogleSignIn' className='google-login'></div>
                <Link id='make-account' to={'/signup'}>Don't have an account? Sign up</Link>
            </form>
            <img src='/images/chair-logo.png' className='chair-logo'/>
       </div>
    )
}