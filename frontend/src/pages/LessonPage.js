import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Lesson from '../components/Lesson'
import LessonList from '../components/LessonList'

export default function LessonPage( {unitTitle, topicTitle, lessons, lesson} ) {
    return (
        <div>
            <Helmet>
                <title>{topicTitle}</title>
                <meta name='description' content='Follow the content of each lesson to achieve mastery in each chemistry topic' />
            </Helmet>
            <Navbar/>
            <LessonList topicTitle={topicTitle} lessons={lessons} unitTitle={unitTitle} isLessonPage={true}/>
            <Lesson lesson={lesson} topicTitle={topicTitle} unitTitle={unitTitle}/>
        </div>
    )

}