import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../services/ApiService'

function LessonButtons({ lesson, topicTitle }) {
    const [lessons, setLessons] = useState([])
    const [previousLesson, setPreviousLesson] = useState(null)
    const [nextLesson, setNextLesson] = useState(null)

    useEffect(() => {
        ApiService.GetLesson()
            .then(fetchedLessons => {
                setLessons(fetchedLessons)
            })
            .catch(error => {
                console.error('Error fetching lessons:', error)
            })
    }, [])

    useEffect(() => {
        const currentIndex = lessons.findIndex(lessons => lessons.id === lesson.id);
        
        if (currentIndex > 0) {
            setPreviousLesson(lessons[currentIndex - 1])
        } else {
            setPreviousLesson(null);
        }

        if (currentIndex !== -1 && currentIndex < lessons.length - 1) {
            setNextLesson(lessons[currentIndex + 1])
        } else {
            setNextLesson(null)
        }
    }, [lessons, lesson.id])

    return (
        <div>
            {nextLesson && (
                <Link to={`/topics/${encodeURIComponent(topicTitle)}/${encodeURIComponent(nextLesson.title)}`}>
                    NEXT
                </Link>
            )}
            {previousLesson && (
                <Link to={`/topics/${encodeURIComponent(topicTitle)}/${encodeURIComponent(previousLesson.title)}`}>
                    PREVIOUS
                </Link>
            )}
        </div>
    );
}

export default LessonButtons