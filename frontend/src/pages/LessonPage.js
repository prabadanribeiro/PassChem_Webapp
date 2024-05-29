import React from 'react'
import Navbar from '../components/Navbar'
import Lesson from '../components/Lesson'
import LessonList from '../components/LessonList'
import GoBackButton from '../components/GoBackButton'

export default function LessonPage( {unitTitle, topicTitle, topicLessons, lesson} ) {
    
    return (
        <div>
            <Navbar />
            <GoBackButton page={"Lesson Page"} topicTitle={topicTitle} unitTitle={unitTitle}/>
            <Lesson lesson={lesson} topicTitle={topicTitle} unitTitle={unitTitle}/>
            <LessonList topicTitle={topicTitle} lessons={topicLessons} unitTitle={unitTitle}/>
        </div>
    )

}