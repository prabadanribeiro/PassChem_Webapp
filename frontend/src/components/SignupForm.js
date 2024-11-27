import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config/Config'
import api from '../services/AxiosServices'
import PasswordStrengthVerifier from '../services/PasswordStrenghVerifier'
import '../styles/SignUp.css'

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
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    

    async function handleCallbackResponse(response) {
        const url = 'api/users/google-register/'
        const tokenPayload = {
            token: response.credential,
        }
        try {
            await api.post(url, tokenPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            const response = await api.post('api/users/google-login/', tokenPayload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            const { access_token, refresh_token } = response.data
    
            Cookies.set('access_token', access_token)
            Cookies.set('refresh_token', refresh_token)
            navigate('/')

        } catch (error) {
            console.error('Error logging in with Google:', error.response ? error.response.data : error.message)
        }
        
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
                { theme: 'outline', size: 'large', type: 'icon' }
            )
        })
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
        if (password == confirmPassword) {
            try {
                await api.post("api/users/register/", userRegister)
                const {data} = await api.post("api/users/login/", user)
                Cookies.set('access_token', data.access_token)
                Cookies.set('refresh_token', data.refresh_token)
                navigate("/")
            }
            catch (error) {
                console.error("error in registration: ", error.response.data);
            }
        } else {
            setErrorMessage('Passwords do not match. Please Try Again.')
        }
    }

    const requirements = [
      { id: 1, text: 'At least 8 characters', isValid: (pwd) => pwd.length >= 8 },
      { id: 2, text: 'At least one number', isValid: (pwd) => /\d/.test(pwd) },
      { id: 3, text: 'At least one uppercase letter', isValid: (pwd) => /[A-Z]/.test(pwd) },
      { id: 4, text: 'At least one special character', isValid: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    ];

    return (
        <div className='sign-up-hero'>
            <form onSubmit={submit}>
                <div className='sign-up-content'>
                    <h3>Register an account</h3>
                    <div className='name-fields-container'>
                        <div className='inline-container'>
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
                        <div className='inline-container' style={{marginLeft: '8%'}}>
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
                    </div>
                    <div className='sign-up-input'>
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
                    <div className='sign-up-input'>
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
                    <div style={{marginTop:'10px', fontFamily:'DM Sans'}}>
                      <ul
                          style={{
                              transform: password ? 'translateY(0)' : 'translateY(-30px)',
                              opacity: password ? 1 : 0,
                              transition: 'transform 0.7s ease, opacity 0.7s ease'
                          }}
                      >
                          {password &&
                              requirements.map((req) => (
                                  <li
                                      key={req.id}
                                      style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          marginBottom: '10px',
                                          color: req.isValid(password) ? 'green' : 'red',
                                      }}
                                  >
                                      <span
                                          style={{
                                              marginRight: '10px',
                                              fontSize: '18px',
                                          }}
                                      >
                                          {req.isValid(password) ? '✔' : '✖'}
                                      </span>
                                      {req.text}
                                  </li>
                              ))}
                      </ul>
                    </div>
                    <div className='sign-up-input'>
                        <label>Confirm Password</label>
                        <input 
                            name='Confirm Password' 
                            type="password"     
                            placeholder="Enter password"
                            value={confirmPassword}
                            required
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    {errorMessage && <div>{errorMessage}</div>}
                    <p>*Sponholtz Productions will not sell or distrbute your information</p>
                    <div className='sign-up-buttons-container'>
                        <button disabled={!firstName || !lastName || !email || !PasswordStrengthVerifier.checkPassword(password)} type="submit">Register</button>
                        <div id='GoogleSignIn' className='google-sign-up' data-type='icon'></div>
                    </div>
                </div>
            </form>
       </div>
    )
}