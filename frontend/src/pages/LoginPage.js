import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import Logout from '../components/Logout'

export default function LoginPage() {

    return (
        <div>
            <Navbar />
            <LoginForm />
            <Logout />
        </div>
    )
}