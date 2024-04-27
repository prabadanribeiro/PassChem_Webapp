import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../styles/About.css'

export default function Team() {

  function popup() {
    document.getElementsByClassName('popup')[0].classList.add('active')
  }

  function dismiss(){
    document.getElementsByClassName("popup")[0].classList.remove("active")
  }

  const [isActive, setIsActive] = useState(false);

  const toggleBlur = () => {
    setIsActive(!isActive);
  };

  const [buttonClicked, setButtonClicked] = useState(null);

  return (
    <div className="about-hero">
      <div className={isActive ? "blur-container active" : "blur-container"}>
        <div className='gradient-parent'>
          <canvas className='gradient-band'/>
        </div>
        <div className='about-container'>
          <div className='about-content'>
            <h2>The PassChem: Sponholtz Productions Team</h2>
            <p>To support educators and students alike, Pass Chem: Sponholtz Productions has developed
  cutting-edge teaching/review tools that surpass current market offerings. Leveraging advanced
  computer modeling techniques akin to those utilized in blockbuster films like &quot;Toy Story&quot; and
  &quot;Harry Potter,&quot; as well as popular video games such as &quot;Halo&quot; and &quot;Call of Duty,&quot; the team has
  crafted visually stunning materials. These resources not only captivate students&#39; attention but also
  provide comprehensive three-dimensional representations of complex chemical properties,
  notoriously challenging for introductory-level learners to grasp.</p>
          </div>
        </div>
        <h4 className='team-header'>Meet the Team</h4>
      </div>
      <section className='team-flexbox' id='flexbox'>
        <div className='popup'>
          <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {dismiss(); toggleBlur()}} viewBox="0 0 320 512">{/*! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. */}<path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
          {buttonClicked === 1 ? (
            <div className='bio-container'>
              <h4>William R. Sponholtz, III, B.S., M.S., PH.D.<br/> President Sponholtz Productions, LLC, Chemistry Research/Teacher</h4>
              <h5>YouTube Channel: <a href='https://www.youtube.com/@SponholtzProductions' target='_blank' alt="PassChem YT" className='bio-link'>“PassChem: Sponholtz Productions”</a></h5>
              <p>Dr. Sponholtz holds a Ph.D. in Organic Chemistry, specializing in Natural Products Chemistry, from Dartmouth College. With over three decades of experience, he has conducted research and taught chemistry at institutions including Dartmouth College, the University of Hawaii, and the University of Tennessee. His expertise lies in isolating and determining the structures of novel medicinal compounds. Notably, his contributions have garnered him accolades such as the &quot;Massachusetts High School Chemistry Teacher of The Year Award&quot; from the American Institute of Chemists and recognition as a Morehead-Caine Impact Educator. Additionally, he holds a patent for discovering an anticancer compound and a broad-spectrum antibiotic. Dr. Sponholtz&#39;s research extends to publications in scientific journals, detailing innovative synthetic routes to previously undiscovered compounds with applications ranging from high-energy/high-density explosives to medicinal compounds. Beyond academia, he has coached soccer, skiing, and tennis for his students.<br/><br/> However, Dr. Sponholtz&#39;s true passion lies in making introductory and organic chemistry more accessible to young learners worldwide. He achieves this by leveraging cutting-edge technology to develop novel teaching tools, including augmented reality/virtual reality experiences and instructional videos. These resources, available for free on his YouTube Channel &quot;PassChem: Sponholtz Productions,&quot; have been translated into multiple languages such as Spanish, French, Hindi, Korean, Farsi, Polish, Mandarin, and Russian, which have garnered millions of views. Currently residing in the mountains of western North Carolina, Dr. Sponholtz continues to innovate and create educational resources for students globally.</p>
            </div>     
          ) : null}
          {buttonClicked === 2 ? (
            <div className='bio-container'>
              <h4>Gordon W. Gribble, Narrator</h4>
              <p>Gordon W. Gribble is a native of San Francisco, California, and completed his undergraduate education at the University of California at Berkeley in 1963. He earned a Ph.D. in organic chemistry at the University of Oregon in 1967. After a National Cancer Institute Postdoctoral Fellowship at the University of California, Los Angeles, he joined the faculty of Dartmouth College in 1968 where has been Full Professor of Chemistry since 1980. He served as Department Chair from 1988-1991. Professional awards include a National Institutes of Health Research Career Development Award, 1971-76, a National Science Foundation Science Faculty Professional Development Award, 1977-78, and the American Cyanamid Academic Award in 1988. He won the Dartmouth Distinguished Teaching Award in 1997, and in 1998 was awarded the Chemistry Alumni Award by the University of Oregon. In 2005, he was named to the newly endowed Chair as "The Dartmouth Professor of Chemistry," and in 2006 won the Arts and Sciences Graduate Faculty Mentoring Award. Dr. Gribble has published 315 papers in natural product synthesis, synthetic methodology, heterocyclic chemistry, natural organohalogen compounds, and synthetic triterpenoids, one of which is currently in Phase 2 clinical trials for the treatment of melanoma and pancreatic cancer. Another group of compounds, "DNA Bis-Intercalators", shows promise against the brain tumor glioblastoma in mice. Since 1995 he has co-edited the annual series "Progress in Heterocyclic Chemistry", and the 2nd edition of "Palladium in Heterocyclic Chemistry", co-authored with Jack Li, was published last year. Dr. Gribble has had a long-standing interest in organic chemical toxicity, chemical carcinogenesis, chemicals in the environment, and naturally occurring organohalogen compounds, and he has just finished his second monograph on naturally occurring organohalogen compounds. As a home winemaker for the past 30 years, he has a strong interest in the chemistry of wine and winemaking.</p>
            </div>
            ) : null}
          {buttonClicked === 3 ? (
            <div className='bio-container'>
              <h4>John Kunz, Computer Modeler and Animator </h4>
              <h5>YouTube Channel: <a target='_blank' href='https://www.youtube.com/@JohnKunz' alt="John Kunz YT" className='bio-link'>"John Kunz"</a></h5>
              <p>John is a founding member of Sponholtz Productions, LLC who has worked full-time as well as part-time since 2006. John is an effects artist located in San Francisco, with professional experience in virtual reality, feature films, commercials and music videos. He specializes in simulating and rendering complex forms and motion such as natural phenomena, abstract anomalies and sacred celestial experiences. He has completed projects for Industrial Light & Magic and has taught Animation/VFX classes at the Academy of Art in San Francisco. Additionally, John makes online tutorials for the 3D animation software Houdini through YouTube and <a href='https://www.patreon.com/johnkunz' alt="John Kunz's Patreon" target='_blank' className='bio-link'>Patreon</a>. You can view his portfolio <a href='https://www.johnkunz.com/' alt="John Kunz's Portfolio" target='_blank' className='bio-link'>here</a>.</p>
            </div>
          ) : null}
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-1.jpeg' alt='Member #1' />
              <h4>Will R. Sponholtz, III, PH.D.</h4>
              <p>President and Founder</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>Dr. Sponholtz earned a PH.D. in organic synthetic chemistry with an emphasis in Natural Products Chemistry from Dartmouth College.</p>
              <button onClick={() => {setButtonClicked(1); popup(); toggleBlur()}}>Learn More</button>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-2.jpeg' alt='Member #2' />
              <h4>Gordon W. Gibble, PH.D.</h4>
              <p>Narrator</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>Professor Gribble (Prof. Emeritus Dartmouth College)</p>
              <button onClick={() => {setButtonClicked(2); popup(); toggleBlur()}}>Learn More</button>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-3.jpeg' alt='Member #3' />
              <h4>John Kunz</h4>
              <p>Former Computer Modeler/Animator</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>John Kunz is a founding member of Sponholtz Producitons, LLC.</p>
              <button onClick={() => {setButtonClicked(3); popup(); toggleBlur()}}>Learn More</button>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-4.jpeg' alt='Member #4' />
              <h4>David Nevins</h4>
              <p>Former Computer Animator</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>David has created novel computer animations previously unavailable to the student and teacher.</p>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-5.jpeg' alt='Member #5' />
              <h4>Ryan Gardner</h4>
              <p>Former Videographer / Editor</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>Ryan Gardner is a founding member of Sponholtz Productions, LLC.</p>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-6.jpeg' alt='Member #6' />
              <h4>Christopher Atala</h4>
              <p>Former App Designer</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>Christopher Atala is a founding member of Sponholtz Productions, LLC.</p>
            </div>
          </div>
        </div>
        <div className='card-bounds'>
          <div className='member-card'>
            <div className='frontside'>
              <img src='images/team-img-9.png' alt='Member #9' />
              <h4>Andy Kim</h4>
              <p>Marketing/Translator</p>
            </div>
            <div className='flipped-content'>
              <h5>About</h5>
              <p>Andy Kim was the former head of marketing and development at Sponholtz Productions, LLC.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}