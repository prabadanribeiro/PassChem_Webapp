import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const accessToken = Cookies.get('access_token')
        const refreshToken = Cookies.get('refresh_token')

        if (accessToken && refreshToken) {
            setIsAuthenticated(true)
            // navigate("/")
        }
    }, [navigate])

    const submit = async (event) => {
        event.preventDefault()
        const user = {
            email : email,
            password: password,
        }
        try {
            const {data} = await axios.post("http://localhost:8000/api/token/", user)
            Cookies.set('access_token', data.access)
            Cookies.set('refresh_token', data.refresh)
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
        <div>
            <form onSubmit={submit}>
                <div>
                    <h3>Sign In</h3>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <div>
                        <label>Email</label>
                        <input
                            placeholder="Email" 
                            name='email'  
                            type='email' value={email}
                            required 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
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
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>
       </div>
    )
}