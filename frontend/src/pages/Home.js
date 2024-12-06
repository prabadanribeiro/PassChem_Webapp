import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Quotes from '../components/Quotes'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <div style={{backgroundColor: '#e7e3e3'}}>
            <Helmet>
                <title>PassChem: Free, easy-to-use chemistry resources</title>
                <meta property='og:site_name' content='passchem.org' />
                <meta property='og:title' content='PassChem: Free, easy-to-use chemistry resources for everyone'/>
                <meta name='description' content='PassChem offers free high-quality videos, worksheets, and answer keys to improve your understanding and mastery of chemistry.'/>
                <meta property='og:description' content='PassChem offers free high-quality videos, worksheets, and answer keys to improve your understanding and mastery of chemistry.' />
                <meta name='keywords' content='Chemistry, Organic Chemistry, Free Videos, Free Worksheets'/>
            </Helmet>
            <Navbar isHome/>
            <Main/>
            <Quotes/>
            <Footer/>
        </div>
    )
}
