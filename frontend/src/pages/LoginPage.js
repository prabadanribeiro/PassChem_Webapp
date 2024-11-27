import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {

    useEffect(() => {
        document.title = 'Login - PassChem';
    }, []);

    return (
        <div>
            <Navbar />
            <LoginForm />
        </div>
    )
}