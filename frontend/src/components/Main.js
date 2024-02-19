import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'

export default function Main(){
  return (
    <div className="wrapper" id='section2'>
      <section className='upper-main'>
        <div className='light'></div>
        <div className='upper-left-container'>
          <h2 className='header'>Access <span className='gradient-green'>free</span> courses <br></br>with videos and <br></br>exercises</h2>
          <p>Lessons include practice problems, narrated videos, and stunning visual effects. Master the material from each unit and grow your chemistry skills by following each lesson.</p>
          <Link className='topics-button' to={'/topics'}>Take me there</Link>
        </div>
        <div className='upper-right-container'>
          <img src='' alt='Lesson UI' className='example-image'/>
        </div>
      </section>
      <section className='lower-main'>
        <h2 className='header' style={{textAlign: 'center'}}><span className='gradient-blue'>Premium</span> teaching tools</h2>
        <div className='anim-showcase'>
          <div className='example-text'>Animation showcase *2 animations*</div>
        </div>
      </section>
    </div>
  )
}