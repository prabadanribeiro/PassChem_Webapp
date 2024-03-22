import React from 'react'
import { Link } from 'react-router-dom'

export default function LessonList( {topicLessons, topicTitle}) {
    
    return (
        <div>
            {
                topicLessons.map(lesson => 
                    <ul className='list'>
                        <li className='list_item'>
                            <Link to={`/topics/${encodeURIComponent(topicTitle)}/${encodeURIComponent(lesson.title)}`}>
                                {lesson.title}
                            </Link> 
                        </li>
                    </ul>
                )
            }
        </div>
    )
    

}