import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LessonList from '../components/LessonList'
import '../styles/LessonOverview.css'

export default function LessonOverview( {topicLessons, topicUnit, topicTitle} ) {

    return (
        <div>
            <Navbar />
            <div>
                <h1 className='unit'>Unit {topicUnit}: {topicTitle}</h1>
            </div>
            <LessonList topicLessons={topicLessons} topicTitle={topicTitle}/>
        </div>
    )
}
