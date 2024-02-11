import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'

export default function Main(){
  return (
    <div className="wrapper" id='section2'>
      <section className='upper-main'>
        <div className='upper-left-container'>
          <h2 className='header'>Access <span className='gradient-green'>free</span> courses <br></br>with videos and <br></br>exercises</h2>
          <p className='p-content'>Lessons come included with practice problems, narrated videos, and stunning visual effects. Master the material from each unit as you grow your chemistry skills by following each lesson.</p>
        </div>
        <div className='upper-right-container'>
          <div className='example-image'>Image of lesson UI here</div>
        </div>
      </section>
      <section className='lower-main'>
        <h2 className='header' style={{textAlign: 'center'}}><span className='gradient-blue'>Premium</span> teaching tools</h2>
        <div className='anim-showcase'>
          <div className='example-image'>Animation showcase *2 animations*</div>
        </div>
      </section>
    </div>
  )
}