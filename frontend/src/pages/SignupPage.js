import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'
import Logout from '../components/Logout'

export default function SignupPage() {

    return (
        <div>
            <Navbar />
            <SignupForm />
            <Logout />
        </div>
    )
}