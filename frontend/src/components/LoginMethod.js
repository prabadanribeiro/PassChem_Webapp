import React, {useEffect, useState} from "react"
import api from "../services/AxiosServices"
import config from '../config/Config'
import Cookies from 'js-cookie'
import '../styles/ProfilePage.css'

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

export default function LoginMethod({ email, googleEmail, emailAuth, googleAuth }) {

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [formVisibility, setFormVisibility] = useState(false)

    function handleLinkGoogleAccount(response) {
        const linkGoogleUrl = 'api/users/link-google-account/'
    
        const tokenPayload = {
            token: response.credential,
        }
    
        api.post(linkGoogleUrl, tokenPayload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            },
        })
        .then(response => {
            console.log('Google account linked successfully')
            alert('Your Google account has been linked successfully.')
        })
        .catch(error => {
            console.error('Error linking Google account:', error.response ? error.response.data : error.message);
            if (error.response && error.response.data === 'Google account already linked') {
                console.error('This Google account is already linked to another user.')
            }
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
                callback: handleLinkGoogleAccount,
            })

            google.accounts.id.renderButton(
                document.getElementById('LinkGoogleAccount'),
                { theme: 'outline', size: 'large' }
            )
        })
    }, [])

    const submit = async (event) => {

        event.preventDefault()

        const linkUrl = 'api/users/link-email-password/'

        const payload = {
            email: newEmail,
            password: newPassword,
        }

        api.post(linkUrl, payload, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`,
            },
        })
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.error('Error linking email and password:', error.response ? error.response.data : error.message)
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred')
        })
    }

    const changeVisibility = () => {
        setFormVisibility(prevVisibility => !prevVisibility)
    }

    const requirements = [
      { id: 1, text: 'At least 8 characters', isValid: (pwd) => pwd.length >= 8 },
      { id: 2, text: 'At least one number', isValid: (pwd) => /\d/.test(pwd) },
      { id: 3, text: 'At least one uppercase letter', isValid: (pwd) => /[A-Z]/.test(pwd) },
      { id: 4, text: 'At least one special character', isValid: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    ];

    return (
        <>
            <h3>Method of Authorization</h3>
            <p className="login-method-description">These authorization methods can be used to log in to your PassChem account. </p>
            <div className="email-container">
                <h4>Google:</h4>
                {googleAuth && <div className="user-email">{googleEmail}</div>}
                {!googleAuth && <div id='LinkGoogleAccount' className="user-email"></div>}
            </div>
            <div className="email-container">
                {!formVisibility && <h4>Email:</h4>}
                {emailAuth && <div className="user-email">{email}</div>}
                {(!formVisibility && googleAuth && !emailAuth) && <button onClick={changeVisibility}>Link Email</button>}
                {formVisibility && 
                <>
                    <form onSubmit={submit}>
                        <label className="email-form-label">Email:</label>
                        <input 
                            className="email-form-input"
                            name='email'  
                            type='email' 
                            value={newEmail}
                            required 
                            onChange={e => setNewEmail(e.target.value)}
                        />
                        <label className="email-form-label">Password:</label>
                        <input 
                                className="email-form-input"
                                name='Password' 
                                type="password"     
                                value={newPassword}
                                required
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        <button type="submit">Submit</button>
                    </form>
                    <ul
                        style={{
                            transform: newPassword ? 'translateY(0)' : 'translateY(-30px)',
                            opacity: newPassword ? 1 : 0,
                            transition: 'transform 0.7s ease, opacity 0.7s ease'
                        }}
                    >
                    {newPassword &&
                        requirements.map((req) => (
                        <li
                            key={req.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                color: req.isValid(newPassword) ? 'green' : 'red',
                            }}
                        >
                            <span
                            style={{
                                marginRight: '10px',
                                fontSize: '18px',
                            }}
                            >
                            {req.isValid(newPassword) ? '✔' : '✖'}
                            </span>
                            {req.text}
                        </li>
                    ))}
                    </ul>
                </>
                }
            </div>
        </>
    )
}