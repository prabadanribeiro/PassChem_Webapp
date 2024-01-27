import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'

export default function Main(){
  return (
    <div className="wrapper" id='section2'>
      <div className="left-container">
        <section className="position-content">
          <h2 className="header">Access free courses</h2>
          <p className="p-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.</p>
          <Link className="topics-button" to={'/topics'}>Get Started</Link>
        </section>
      </div>
      <div className="right-container">
        <h3>Animation here</h3>
      </div>
    </div>
  )
}