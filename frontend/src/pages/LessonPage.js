import React from 'react'
import Navbar from '../components/Navbar'
import Lesson from '../components/Lesson'
import LessonList from '../components/LessonList'

export default function LessonPage( {topicLessons, lesson, topicTitle} ) { // topicUnit, topicTitle, lesson
    
    return (
        <div>
            <Navbar />
            <LessonList topicLessons={topicLessons} topicTitle={topicTitle} isLessonPage={true}/>
            <Lesson key={lesson.id} lesson={lesson} topicTitle={topicTitle}/>
        </div>
    )

}