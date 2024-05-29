import React from 'react'
import Navbar from '../components/Navbar'
import UnitsGrid from '../components/UnitsGrid'
import '../styles/Topics.css'
import Footer from '../components/Footer'

export default function UnitsPage() {
    return (
        <div>
            <Navbar />
            <UnitsGrid />
            <Footer />
        </div>
    )             
}