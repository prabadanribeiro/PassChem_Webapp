import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'

export default function Main(){
  return (
    <div className="wrapper" id='section2'>
      <section className='upper-main'>
        <div className='light'></div>
        <div className='courses-overview'>
          <h2 className='header'>Access <span className='gradient-green'>free</span> courses <br></br>with videos and <br></br>exercises</h2>
          <p>Lessons include practice problems, narrated videos, and stunning visual effects. Master the material from each unit and grow your chemistry skills by following each lesson.</p>
          <Link className='page-link-button' to={'/topics'}>Take me there</Link>
        </div>
        <div className='lesson-display'>
          <img src='' alt='Lesson UI' />
        </div>
      </section>
      <section className='anim-container'>
        <h2 className='header' style={{textAlign: 'center'}}><span className='gradient-blue'>Premium</span> teaching tools</h2>
        <div className='anim-showcase'>
          <p>Animation showcase *2 animations*</p>
        </div>
      </section>
      <section className='ar-hero'>
        <div className='ar-container'>
          <h3><span className='text-bg'>AR</span> in Chemistry</h3>
          <p>Our augmented reality teaching tool will fully immerse the student into unprecedented three-dimensional visuals as well as allow them to interact and build molecules in three-dimensions.</p>
          <Link className='page-link-button'>AR with PassChem</Link>
        </div>
        <img src='images/ar-app.png' className='ar-app-image'/>
      </section>
    </div>
  )
}