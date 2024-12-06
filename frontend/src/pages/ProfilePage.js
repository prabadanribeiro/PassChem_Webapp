import React, { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import api from "../services/AxiosServices"
import Logout from "../components/Logout"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Delete from "../components/Delete"
import ResetPassword from "../components/ResetPassword"
import LoginMethod from "../components/LoginMethod"
import '../styles/ProfilePage.css'

export default function ProfilePage() {

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [googleEmail, setGoogleEmail] = useState('')
    const [emailAuth, setEmailAuth] = useState('')
    const [googleAuth, setGoogleAuth] = useState('')
    const [modalVisibility, setModalVisibility] = useState(false);
    const [deleteInput, setDeleteInput] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
      try {
          api.get('api/users/get-email', {
              headers: {
                  'Authorization': `Bearer ${accessToken}`
              }
          })
          .then(response => {
              if (response.data.auth_method === 'both') {
                  setEmail(response.data.email)
                  setGoogleEmail(response.data.google_email)
                  setGoogleAuth(true)
                  setEmailAuth(true)
              } else if (response.data.auth_method === 'email/password') {
                  setEmail(response.data.email)
                  setEmailAuth(true)
              } else {
                  setGoogleEmail(response.data.google_email)
                  setGoogleAuth(true)
              }
          })
      } catch (error) {
          setErrorMessage('An error occured. Please try again.')
      }
    }, [])

    const receiveModalToggle = () => {
      setModalVisibility(!modalVisibility);
    }

    const handleDeleteInputChange = (e) => {
      setDeleteInput(e.target.value);
    }

    const handleDeleteButton = () => {
      if (deleteInput === "DELETE") {
        api.delete('api/users/delete-account', {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
        }).then( () => {
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            navigate('/')
        })
      } else {
        setDeleteMessage("Input does not match 'DELETE'. Please try again")
      }
    }

    const handlePasswordUpdate = (newPassword) => {
      setPassword(newPassword);
    };

    const requirements = [
      { id: 1, text: 'At least 8 characters', isValid: (pwd) => pwd.length >= 8 },
      { id: 2, text: 'At least one number', isValid: (pwd) => /\d/.test(pwd) },
      { id: 3, text: 'At least one uppercase letter', isValid: (pwd) => /[A-Z]/.test(pwd) },
      { id: 4, text: 'At least one special character', isValid: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    ];

    const gradientParentStyle = {
      position: 'absolute',
      top: '90px',
      left: '0',
      width: '100%',
      height: '300px',
      transformOrigin: '0 60%',
      transform: 'skewY(-8deg)',
      overflow: 'hidden',
      zIndex: '-1',
    }

    const gradientAfterStyle = {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        minWidth: '1000px',
        width: '100%',
        height: '100%',
        background:
            'radial-gradient(#8de0e9 40%, transparent 60%) -620px -180px no-repeat, ' +
            'radial-gradient(rgb(173, 231, 239) 10%, transparent 67%) -120px -24px no-repeat, ' +
            'radial-gradient(#629ef1 40%, transparent 70%) -470px 150px no-repeat, ' +
            'hsl(155, 70%, 70%)',
        zIndex: '0',
    }
    
    return (
      <>
        <Helmet>
          <title>My PassChem Profile</title>
          <meta name="description" content="Easily change your PassChem profile information like your email or password in just two clicks."/>
        </Helmet>
        <div style={gradientParentStyle} id="profile-page-gradient">
          <div style={gradientAfterStyle}></div>
        </div>
        <Navbar />
        <div className="profilepage">
          <div className="profile-container">
            <h2>User Settings</h2>
            <hr style={{ marginTop:'20px', marginBottom:'20px'}}/>
            <LoginMethod email={email} googleEmail={googleEmail} emailAuth={emailAuth} googleAuth={googleAuth}/>
            <hr style={{ marginTop:'20px', marginBottom:'20px'}}/>
            <div className="everything-password-container">
              <div>
                <h3>Change Password</h3>
                <ResetPassword email={email} googleEmail={googleEmail} emailAuth={emailAuth} onPasswordUpdate={handlePasswordUpdate}/>
              </div>
              <div 
                style={{
                    transform: password ? 'translateX(0)' : 'translateX(40%)', // Slide effect
                    opacity: password ? 1 : 0, // Fade effect
                    transition: 'transform 0.5s ease, opacity 0.5s ease', // Smooth transition for both
                }}
              >
                {password && 
                    <>
                        <h4 className="user-password-requirement-text">Password Requirements</h4>
                        <hr />
                        <div className="user-password-requirement-bulletpoints">
                            <ul>
                                {requirements.map((req) => (
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
                    </>
                }
              </div>
            </div>
            <hr style={{ margin: '20px 0'}}/>
            <div>
              <Logout />
              <Delete sendModalToggle={receiveModalToggle}/>
            </div>
          </div>
          {modalVisibility && 
            <div className="delete-modal-overlay">
              <div className="delete-modal-content">
                <h4 className="delete-modal-text">Delete User</h4>
                <hr />
                <div className="delete-modal-input">
                  <p>Are you sure you want to permanently delete your PassChem account? If so, type 'DELETE' to permanently delete your account.</p>
                  <input 
                    type="text"
                    placeholder="Type 'DELETE'"
                    value={deleteInput}
                    onChange={handleDeleteInputChange}
                  />
                  <h5 style={{fontSize:'12px', color:'red'}}>{deleteMessage}</h5>
                </div>
                <hr style={{ marginTop: '15px'}}/>
                <div className="delete-modal-buttons">
                  <button className="delete-modal-buttons-delete" onClick={handleDeleteButton}>DELETE</button>
                  <button className="delete-modal-buttons-close" onClick={() => setModalVisibility(!modalVisibility)}>Close</button>
                </div>
              </div>
            </div>
          }
        </div>
        <Footer />
      </>
    )
}