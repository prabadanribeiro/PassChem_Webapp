import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'

export default function Main(){
  return (
    <div className="wrapper">
      <div className="left-container">
        <section className="position-content">
          <h2 className="header">Start your free courses</h2>
          <p className="p-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
          <Link className="topics-button" to={'/topics'}>Get Started</Link>
        </section>
      </div>
      <div className="right-container">
        <h3>Animation here</h3>
      </div>
    </div>
  )
}