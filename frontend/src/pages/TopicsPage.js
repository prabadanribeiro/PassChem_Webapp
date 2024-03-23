import React from 'react'
import Navbar from '../components/Navbar'
import TopicsGrid from '../components/TopicsGrid'
import '../styles/Topics.css'
import Footer from '../components/Footer'

export default function TopicsPage() {
    return (
        <div>
            <Navbar />
            <TopicsGrid />
            <Footer />
        </div>
    )             
}