import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Team from '../components/Team'
import Footer from '../components/Footer'

export default function About() {
    return (
        <>
            <Helmet>
                <title>About Us - PassChem</title>
                <meta name='description' content='PassChem is a team made of students and teachers working to provide free, high quality resources for everyone interested in chemistry.' />
            </Helmet>
            <Navbar />
            <Team />
            <Footer />
        </>
    )
}