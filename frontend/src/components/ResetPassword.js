import React, { useState, useEffect } from "react"
import api from "../services/AxiosServices"
import Cookies from "js-cookie"

export default function ResetPassword() {

    const [newPassword, setNewPassword] = useState('')
    const [re_enterNewPassword, setRe_enterNewPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const submit = async (event) => {

        event.preventDefault()

        if (newPassword === re_enterNewPassword) {
            try {
                const response = await api.get('api/users/get-email', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })
                
                setEmail(response.data.email)

                const data = {
                    email: response.data.email,
                    new_password: newPassword,
                }

                await api.post('api/users/update-password/', data)

                setNewPassword('')
                setRe_enterNewPassword('')
                setSuccessMessage('Your password was successfully changed.')
                setErrorMessage('')

            } catch (error) {
                setErrorMessage('An error occurred. Please try again.')
                setSuccessMessage('')
            }
        } else {
            setErrorMessage('Passwords do not match. Please Try Again.')
            setSuccessMessage('')
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>New Password</label>
                    <input 
                        name='New Password' 
                        type="password"     
                        value={newPassword}
                        required
                        onChange={e => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Re-Enter New Password</label>
                    <input
                        name="Re-Enter New Password"
                        type="password"
                        value={re_enterNewPassword}
                        required
                        onChange={e => setRe_enterNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Save Changes</button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </form>
        </div>
    )
}