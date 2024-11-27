import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Team from '../components/Team'
import Footer from '../components/Footer'

export default function About() {

    useEffect(() => {
        document.title = 'About Us - PassChem';
    }, []);

    return (
        <div>
            <Navbar />
            <Team />
            <Footer />
        </div>
    )
}