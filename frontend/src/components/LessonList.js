import React from 'react'
import { Link } from 'react-router-dom'

export default function LessonList( {topicLessons, topicTitle, isLessonPage}) {
    if (isLessonPage){
        return (
            <div className='lesson-sidebar'>
                <ul className='sidebar-list'>
                    {
                        topicLessons.map(lesson => 
                            <li className='list_item' key={lesson.id}>
                                <Link to={`/topics/${encodeURIComponent(topicTitle)}/${encodeURIComponent(lesson.title)}`}>
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
                    topicLessons.map(lesson => 
                        <li className='list_item' key={lesson.id}>
                            <Link to={`/topics/${encodeURIComponent(topicTitle)}/${encodeURIComponent(lesson.title)}`}>
                                {lesson.title}
                            </Link> 
                        </li>
                    )
                }
            </ul>
        </div>
    )
}