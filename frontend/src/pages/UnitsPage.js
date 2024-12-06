import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import UnitsGrid from '../components/UnitsGrid'
import '../styles/Units.css'
import Footer from '../components/Footer'

export default function UnitsPage() {

    return (
        <>
            <Helmet>
                <title>Chemistry Topics - PassChem</title>
                <meta name='description' content='Access a wealth of chemistry topics with videos and worksheets throughout'/>
            </Helmet>
            <Navbar />
            <UnitsGrid />
            <Footer />
        </>
    )             
}