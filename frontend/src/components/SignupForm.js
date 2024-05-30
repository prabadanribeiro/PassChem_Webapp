import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config/Config'
import api from '../services/AxiosServices'

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
export default function SignupForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    function handleCallbackResponse(response) { 

        const url = 'api/users/google-login/'
        const tokenPayload = {
            token: response.credential,
        }

        api.post(url, tokenPayload, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => { 
            console.log(response.data.access)
            Cookies.set('access_token', response.data.access, { path: '/' })
            Cookies.set('refresh_token', response.data.refresh, { path: '/' })
            setIsAuthenticated(true)
            console.log(Cookies.get('access_token'))
            navigate("/")
        })
        .catch(error => {
            console.error('Error logging in with Google:', error.response ? error.response.data : error.message);
        })
    }

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
                { theme: 'outline', size: 'large' }
            )
        })
    }, [])

    useEffect(() => {
        
        const accessToken = Cookies.get('access_token')
        const refreshToken = Cookies.get('refresh_token')

        if (accessToken && refreshToken) {
            setIsAuthenticated(true)
        }
    }, [])


    const submit = async (event) => {

        event.preventDefault()

        const userRegister = {
            email: email,
            password: password,
            first_name: firstName, 
            last_name: lastName,
        }

        const user = {
            email: email,
            password: password,
        }

        try {
            await axios.post("http://localhost:8000/api/users/register/", userRegister)
            const {data} = await axios.post("http://localhost:8000/api/token/", user)
            Cookies.set('access_token', data.access)
            Cookies.set('refresh_token', data.refresh)
            setIsAuthenticated(true)
            navigate("/")
        }
        catch (error) {
            console.error("error in registration: ", error.response.data);
        }
    }

    if (isAuthenticated) {
        return null
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <h3>Register</h3>
                    <div>
                        <label>First Name</label>
                        <input
                            placeholder="First Name" 
                            name='firstName'  
                            type='text' 
                            value={firstName}
                            required 
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            placeholder="Last Name" 
                            name='lastName'  
                            type='text' 
                            value={lastName}
                            required 
                            onChange={e => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            placeholder="Email" 
                            name='email'  
                            type='email' 
                            value={email}
                            required 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            name='password' 
                            type="password"     
                            placeholder="Enter password"
                            value={password}
                            required
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit">Register</button>
                    </div>
                </div>
            </form>
            <div id='GoogleSignIn'></div>
       </div>
    )
}