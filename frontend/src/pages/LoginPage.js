import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
    return (
        <>
            <Helmet>
                <title>Login to PassChem</title>
                <meta name='Login to start tracking your progress on each lesson' />
            </Helmet>
            <Navbar />
            <LoginForm />
        </>
    )
}