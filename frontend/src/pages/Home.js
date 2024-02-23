import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Quotes from '../components/Quotes'
import Footer from '../components/Footer'

export default function Home() {
    return (
        <div>
            <Navbar isHome/>
            <Main/>
            <Quotes/>
            <Footer/>
        </div>
    )
}
