import React, { useEffect } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import api from "../services/AxiosServices"
import Logout from "../components/Logout"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import ResetPassword from "../components/ResetPassword"
import LoginMethod from "../components/LoginMethod"

export default function ProfilePage() {

    useEffect(() => {
        document.title = 'Profile - PassChem';
    }, []);

    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    const navigate = useNavigate()

    const deleteAccount = () => {
        api.delete('api/users/delete-account', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        }).then( () => {
            Cookies.remove('access_token')
            Cookies.remove('refresh_token')
            navigate('/')
        })
    }
    
    return (
        <div>
            <Navbar />
            <h1>METHOD</h1>
            <LoginMethod />
            <h1>PASSWORD</h1>
            <ResetPassword />
            <Logout />
            <div>
                <button onClick={deleteAccount}>DELETE ACCOUNT</button>
            </div>
            <Footer />
        </div>
    )
}