import React, {useEffect, useState} from "react"
import api from "../services/AxiosServices"
import config from '../config/Config'
import Cookies from 'js-cookie'

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

export default function LoginMethod() {

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [googleAuth, setGoogleAuth] = useState(false)
    const [emailAuth, setEmailAuth] = useState(false)
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


    useEffect(() => {
        try {
            api.get('api/users/get-email', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => {
                setEmail(response.data.email)
                if (response.data.auth_method === 'both') {
                    setGoogleAuth(true)
                    setEmailAuth(true)
                } else if (response.data.auth_method === 'email/password') {
                    setEmailAuth(true)
                } else {
                    setGoogleAuth(true)
                }
            })
        } catch (error) {
            setErrorMessage('An error occured. Please try again.')
        }
        
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
            alert('Email and password linked successfully')
        })
        .catch(error => {
            console.error('Error linking email and password:', error.response ? error.response.data : error.message)
            setErrorMessage(error.response ? error.response.data.error : 'An error occurred')
        })
    }

    const changeVisibility = () => {
        setFormVisibility(prevVisibility => !prevVisibility)
    }

    return (
        <div>
            <h2>These different authorization methods can be used to log in to PassChem</h2>
            <h2>{email}</h2>
            <div>
                <h3>Google</h3>
                {googleAuth && <div>WORKING</div>}
                {!googleAuth && <div id='LinkGoogleAccount'></div>}
            </div>
            <div>
                <h3>Email</h3>
                {emailAuth && <div>WORKING</div>}
                {(!formVisibility && googleAuth && !emailAuth) && <button onClick={changeVisibility}>Link Email to Account</button>}
            </div>
            {formVisibility && 
            <div>
                <form onSubmit={submit}>
                    <label>Email</label>
                    <input 
                        name='email'  
                        type='email' 
                        value={newEmail}
                        required 
                        onChange={e => setNewEmail(e.target.value)}
                    />
                    <label>Password</label>
                    <input 
                            name='Password' 
                            type="password"     
                            value={newPassword}
                            required
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    <button type="submit">Submit</button>
                </form>
            </div>
            }
        </div>
    )
}