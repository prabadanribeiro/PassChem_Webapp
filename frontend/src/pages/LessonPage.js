import React from 'react'
import Navbar from '../components/Navbar'
import Lesson from '../components/Lesson'
import LessonList from '../components/LessonList'

export default function LessonPage( {unitTitle, topicTitle, lessons, lesson} ) {
    
    return (
        <div>
            <Navbar/>
            <LessonList topicTitle={topicTitle} lessons={lessons} unitTitle={unitTitle} isLessonPage={true}/>
            <Lesson lesson={lesson} topicTitle={topicTitle} unitTitle={unitTitle}/>
        </div>
    )

}