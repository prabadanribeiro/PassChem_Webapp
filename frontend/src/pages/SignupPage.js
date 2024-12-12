import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import SignupForm from '../components/SignupForm'

export default function SignupPage() {

    const gradientParentStyle = {
        position: 'absolute',
        top: '90px',
        left: '0',
        width: '100%',
        height: '320px',
        transformOrigin: '0 60%',
        transform: 'skewY(-8deg)',
        overflow: 'hidden',
        zIndex: '0',
    }

    const gradientAfterStyle = {
        content: '',
        position: 'absolute',
        top: '0',
        left: '0',
        minWidth: '1000px',
        width: '100%',
        height: '100%',
        background:
            'radial-gradient(#8de0e9 40%, transparent 60%) -620px -180px no-repeat, ' +
            'radial-gradient(rgb(173, 231, 239) 33%, transparent 67%) -120px -24px no-repeat, ' +
            'radial-gradient(#629ef1 40%, transparent 70%) -470px 150px no-repeat, ' +
            'hsl(155, 70%, 70%)',
        zIndex: '0',
    }

    return (
        <>
            <Helmet>
                <title>Create a Passchem Account</title>
                <meta name='description' content='Create a Passchem account to easily track your progress throughout lessons and topics' />
            </Helmet>
            <div style={gradientParentStyle}>
                <div style={gradientAfterStyle}></div>
            </div>
            <Navbar />
            <SignupForm />
        </>
    )
}