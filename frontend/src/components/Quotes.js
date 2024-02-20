import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Quotes.css'

export default function Quotes(){

  const [translation, setTranslation] = useState(0);

  const btns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const [activeIndex, setActiveIndex] = useState(0);

  function slideFunction(num, index){
    let position = btns.indexOf(num);
    setTranslation(position * -800);
    setActiveIndex(index);
  }
  useEffect(() => {
    const slideAutomatically = () => {
      const currentIndex = activeIndex !== null ? activeIndex : 0;
      const nextIndex = currentIndex === btns.length - 1 ? 0 : currentIndex + 1;
      slideFunction(btns[nextIndex], nextIndex);
    };

    const intervalId = setInterval(slideAutomatically, 8000);

    return () => clearInterval(intervalId);
  }, [activeIndex, btns]);

  return (
    <div className='quotes-page-hero'>
      <div class="divider-shape">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
          </svg>
      </div>
      <div className='testimonial-hero'>
        <div className='testimonial-container'>
          <div className='indicator'>
            {btns.map((num, index) => (
              <span 
                key={index} 
                className={activeIndex === index ? 'active' : ''} 
                onClick={() => slideFunction(num, index)}
              />
            ))}
          </div>
          <div className='overflow-content'>
            <div className='slides-container' id='slide' style={{ transform: `translateX(${translation}px)` }}>
              <div className='testimonial-slide'>
              <section>
                  <q>I looked at it twice, and I love it! Superb graphics, in tune with space age computer games and well paced. I think that this would be a great addition to the teachers' arsenal in teaching organic chemistry.</q>
                  <p>Professor K. Peter Vollhardt, PH.D. (UC, Berkeley) Author of world-famous college text, Organic Chemistry</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>...will help students immensely. ...the video demonstrates them [three-dimensional representations] exceptionally well. I plan to use these DVDs in future classes...</q>
                  <p>Journal of Chemical Education, 2011, 88(1), pp 18-21</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>3-dimensionality of representations is excellent. The molecules moving across a cloud/stellar background adds nicely to 3-D feeling. ...blackboard interpolations are very nice, good connection to standard practice. I also like the shrinking and expansion of the p lobes to show two representations of p-bonds.</q>
                  <p>Professor Roald Hoffmann, PH.D. (Cornell) Nobel Prize, Chemistry, 1981</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>The graphics are awesome. Overall, I like it and would advise beginning students to purchase it or view it.</q>
                  <p>Professor James J. Worman, PH.D. (RIT)</p>
                </section>
              </div> 
              <div className='testimonial-slide'>
              <section>
                  <q>These DVDs are perfectly suited for today's learning environment... a great addition to the ambitious high school student or undergraduate's chemistry tool bag.</q>
                  <p>Paul Ford, PH.D., Principal Scientist, McCormick and Company, Inc.</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>Students across all disciplines and educational levels will find themselves engaged in these captivating, informative, constructive, and novel instructional tools. These DVDs will no doubt help students achieve their maximum learning potential.</q>
                  <p>Josh Kogot, PH.D., Army Research Scientist</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>They are brillant! I will make good use of these and will recommend others buy them.</q>
                  <p>Sandy Humphrey, BSc., Nechako Valley Secondary School</p>
                </section>
              </div> 
              <div className='testimonial-slide'>
              <section>
                  <q>Every one of my students greatly enjoyed and learned about hybridization today via your video. There is no better way to convey the 3-D aspect of the molecules. Your students have created an impressive series of videos!</q>
                  <p>Wendy Athens, B.S., M.S. AP, Honors and Regular Chemistry Evangelical Christian School Fort Myers, FL</p>
                </section>
              </div>
              <div className='testimonial-slide'>
              <section>
                  <q>These DVD's are an extraordinary instructional and motivational tool for teachers to help students visualize and learn.~ Lessons are clear, focused, engaging, and fun.~ They heighten a student's eagerness to learn.</q>
                  <p>Frances Gatz, Ph.D., Director, Rainforest Workshops (exploring medicinal plant chemistry and use) Environmental Expeditions</p>
                </section>
              </div>
              <div className='testimonial-slide'>
                <section>
                  <q>The sophisticated animations of abstract concepts and processes really brings them to life for my students.</q>
                  <p>Christian Canfield, Newtown High School, Connecticut</p>
                </section>
              </div>
              <div className='testimonial-slide'>
                <section>
                  <q>The CD's were great... I used all 3 of the CD's in a variety of classes. They are a powerful teaching tool and the students really loved them. The chemical bonding and hybridization theory went over especially well in my organic chemistry class. Students even asked where they could get a copy so I directed them to the bookstore.</q>
                  <p>Keith A. Baessler, PH.D. Assistant Professor of Chemistry Suffolk County Community College</p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}