import React from 'react'
import Navbar from '../components/Navbar'
import Lesson from '../components/Lesson'
import LessonList from '../components/LessonList'

export default function LessonPage( {topicLessons, lesson, topicTitle} ) { // topicUnit, topicTitle, lesson
    
    return (
        <div>
            <Navbar />
            <Lesson lesson={lesson}/>
            <LessonList topicLessons={topicLessons} topicTitle={topicTitle}/>
        </div>
    )

}