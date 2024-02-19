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
      {/* <div class="divider-shape">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
        </svg>
      </div> */}
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