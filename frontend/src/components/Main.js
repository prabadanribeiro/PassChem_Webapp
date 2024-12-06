import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Main.css'
import SplineAsset from '../components/SplineAsset'

export default function Main(){
  return (
    <div id='section2'>
      <section className='upper-main'>
        <div className='courses-overview'>
          <h2 className='header'>Access <span className='gradient-green'>free</span> courses with videos and exercises</h2>
          <p>Lessons include practice problems, narrated videos, and stunning visual effects. Master the material from each unit and grow your chemistry skills by following each lesson.</p>
          <Link className='page-link-button' to={'/curriculum'}>Take me there</Link>
        </div>
        <SplineAsset />
      </section>
      <section className='ar-hero'>
        <div className='ar-container'>
          <h3><span className='text-bg'>AR</span> in Chemistry</h3>
          <p>Our augmented reality teaching tool (compatible with iPad and iPhone only) will fully immerse the student into unprecedented three-dimensional visuals as well as allow them to interact and build molecules in three-dimensions.</p>
          <a className='page-link-button' href='https://apps.apple.com/vn/app/a-r-chem/id1377946463#?platform=iphone' target='_blank'>AR with PassChem<svg xmlns="http://www.w3.org/2000/svg" height="21px" viewBox="0 -960 960 960" width="21px" fill="#87dff8" className='leave-page-svg'><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg></a>
        </div>
        <img src='images/ar-app.png' className='ar-app-image' alt='AR app image'/>
      </section>
    </div>
  )
}