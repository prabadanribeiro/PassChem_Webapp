import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Quotes from '../components/Quotes'

export default function Home() {
    return (
        <div>
            <Navbar isHome/>
            <Main/>
            <Quotes/>
        </div>
    )
}
