import React from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'
import '../styles/LessonOverview.css'

export default function LessonList( {unitTitle, topicTitle, lessons, isLessonPage}) {
    if (isLessonPage){
        return (
            <div className='lesson-sidebar'>
                <ul className='sidebar-list'>
                    {
                        lessons.map(lesson => 
                            <li className='list_item' key={lesson.id}>
                                <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}/${URLService.slugify(lesson.title)}`}>
                                    {lesson.title}
                                </Link> 
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

    
    return (
        <div>
            <ul className='list'>
                {
                    lessons.map(lesson => 
                        <li className='list_item' key={lesson.id}>
                            <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}/${URLService.slugify(lesson.title)}`}>
                                {lesson.title}
                            </Link> 
                        </li>
                    )
                }
            </ul>
        </div>
    )
   
}