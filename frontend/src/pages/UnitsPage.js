import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import UnitsGrid from '../components/UnitsGrid'
import '../styles/Units.css'
import Footer from '../components/Footer'

export default function UnitsPage() {

    useEffect(() => {
        document.title = 'Units - PassChem';
    }, []);

    return (
        <div>
            <Navbar />
            <UnitsGrid />
            <Footer />
        </div>
    )             
}