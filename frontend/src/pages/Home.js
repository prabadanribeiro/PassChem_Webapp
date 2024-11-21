import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Quotes from '../components/Quotes'
import Footer from '../components/Footer'

export default function Home() {

    useEffect(() => {
        document.title = 'PassChem';
    }, []);

    return (
        <div style={{backgroundColor: '#e7e3e3'}}>
            <Navbar isHome/>
            <Main/>
            <Quotes/>
            <Footer/>
        </div>
    )
}
