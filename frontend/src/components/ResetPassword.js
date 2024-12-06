import React, { useState, useEffect } from "react"
import api from "../services/AxiosServices"
import Cookies from "js-cookie"
import PasswordStrengthVerifier from "../services/PasswordStrenghVerifier"

export default function ResetPassword({ email, emailAuth, onPasswordUpdate }) {

    const [newPassword, setNewPassword] = useState('')
    const [re_enterNewPassword, setRe_enterNewPassword] = useState('')
    const [message, setMessage] = useState('')
    const [messageColor, setMessageColor] = useState('red')
    const [displayReEnter, setDisplayReEnter] = useState(false);
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const handleNewPasswordChange = (e) => {
      const updatedPassword = e.target.value;
      setNewPassword(updatedPassword);
      onPasswordUpdate(updatedPassword);
      if (PasswordStrengthVerifier.checkPassword(updatedPassword)) {
        setDisplayReEnter(true);
      } else {
        setDisplayReEnter(false);
      }
  };

    const submit = async (event) => {

        console.log(email)
        event.preventDefault()

        if (PasswordStrengthVerifier.checkPassword(newPassword)) {
          if (newPassword === re_enterNewPassword) {
            if (emailAuth) {
              try {
                const data = {
                  email: email,
                  new_password: newPassword,
                }
  
                await api.post('api/users/update-password/', data)
  
                setNewPassword('')
                setRe_enterNewPassword('')
                setMessage('Your password was successfully changed.')
                setMessageColor('green')
              } catch (error) {
                  setMessage('An error occurred. Please try again.')
              }
            } else {
              setMessage('Connect an email to this account not using a third party authorization method')
            }
          } else {
              setMessage('Passwords do not match. Please try again.')
          }
        } else {
          setMessage('Password does not meet the requirements. Please try again')
        }
        
    }

    return (
          <form onSubmit={submit} style={{marginRight: '30px'}}>
              <div className="new-password-container">
                  <label>New Password:</label>
                  <input 
                      name='New Password' 
                      type="password"     
                      value={newPassword}
                      required
                      onChange={handleNewPasswordChange}
                  />
              </div>
              <div className="new-password-container"
                style={{
                  transform: displayReEnter ? 'translateX(0)' : 'translateY(20%)',
                  opacity: displayReEnter ? 1 : 0,
                  transition: 'transform 0.5s ease, opacity 0.5s ease',
                }}
              >
                <label>Re-Enter New Password</label>
                <input
                    name="Re-Enter New Password"
                    type="password"
                    value={re_enterNewPassword}
                    required
                    onChange={e => setRe_enterNewPassword(e.target.value)}
                />
              </div>
              <div className="new-password-container">
                <button disabled={!displayReEnter || !re_enterNewPassword} type="submit">Save Changes</button>
                {message && <div style={{marginTop:'10px', marginLeft:'10px', color:{messageColor}}}>{message}</div>}
              </div>
          </form>
    )
}