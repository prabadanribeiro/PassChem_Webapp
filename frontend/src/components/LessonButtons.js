import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../services/ApiService'
import URLService from '../services/URLService'
import '../styles/LessonButtons.css'

function LessonButtons({ lesson, topicTitle, unitTitle }) {
    const [lessons, setLessons] = useState([])
    const [topics, setTopics] = useState([])
    const [lessonsLoading, setLessonsLoading] = useState(true) // Initialize as true, change to false once loaded
    const [topicsLoading, setTopicsLoading] = useState(true) // Initialize as true, change to false once loaded
    const [previousLesson, setPreviousLesson] = useState(null)
    const [nextLesson, setNextLesson] = useState(null)

    useEffect(() => {
        ApiService.GetLessons()
            .then(fetchedLessons => {
                setLessons(fetchedLessons)
                setLessonsLoading(false) // Set to false after fetching lessons
            })
            .catch(error => {
                console.error('Error fetching lessons:', error)
                setLessonsLoading(false) // Ensure loading state is updated even on error
            })
        ApiService.GetTopics()
            .then(fetchedTopics => {
                setTopics(fetchedTopics)
                setTopicsLoading(false) // Set to false after fetching topics
            })
            .catch(error => {
                console.error('Error fetching topics:', error)
                setTopicsLoading(false) // Ensure loading state is updated even on error
            })
    }, [])

    useEffect(() => {
        if (!lessonsLoading && !topicsLoading) { // Ensure both lessons and topics are fully loaded
            const currentIndex = lessons.findIndex(lessonItem => lessonItem.id === lesson.id) // Find current lesson index
            const topic = topics.find(topicItem => topicItem.id === lesson.topic) // Find current lesson's topic

            if (currentIndex > 0 && lessons[currentIndex - 1].topic === topic.id) {
                setPreviousLesson(lessons[currentIndex - 1]) // Set previous lesson if within the same topic
            } else {
                setPreviousLesson(null) // Clear previous lesson if none found
            }

            if (currentIndex !== -1 && currentIndex < lessons.length - 1 && lessons[currentIndex + 1].topic === topic.id) {
                setNextLesson(lessons[currentIndex + 1]) // Set next lesson if within the same topic
            } else {
                setNextLesson(null) // Clear next lesson if none found
            }
        }
    }, [lessons, topics, lesson.id]) // Dependency array

    return (
        <div>
            {nextLesson && (
                <Link id='next-button' to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}/${URLService.slugify(nextLesson.title)}`}>
                    NEXT
                </Link>
            )}
            {previousLesson && (
                <Link id='previous-button' to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}/${URLService.slugify(previousLesson.title)}`}>
                    PREVIOUS
                </Link>
            )}
        </div>
    )
}

export default LessonButtons
