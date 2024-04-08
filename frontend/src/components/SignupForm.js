import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function SignupForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate()

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
            // Assuming the registration process might automatically log in the user
            // and return the access and refresh tokens just like the sign-in process.
            // Adjust the property names based on the actual API response.
            Cookies.set('access_token', data.access)
            Cookies.set('refresh_token', data.refresh)
            navigate("/login") // Navigate to sign-in page or directly to the home page as required
        }
        catch (error) {
            console.error("error in registration: ", error.response.data);
            // Handle registration errors (e.g., displaying a message to the user)
        }
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
       </div>
    )
}