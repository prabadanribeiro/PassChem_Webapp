import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'
import GoBackButton from './GoBackButton'
import ApiService from '../services/ApiService'
import Cookies from 'js-cookie'
import '../styles/LessonOverview.css'


export default function LessonList( {unitTitle, topicTitle, lessons, isLessonPage}) {
    

    const [completedLessons, setCompletedLessons] = useState({})
    const [loading, setLoading] = useState(true)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    useEffect(() => {
        const fetchCompletionStatus = async () => {
            const status = {}
            for (const lesson of lessons) {
                try {
                    const isCompleted = await ApiService.GetLessonCompletionStatus(lesson.id, accessToken)
                    status[lesson.id] = isCompleted
                } catch (error) {
                    console.error(`Error fetching completion status for lesson ${lesson.id}:`, error)
                }
            }
            setCompletedLessons(status)
        }
        if (accessToken && refreshToken) {
            fetchCompletionStatus()
        }
        setLoading(false)
    }, [lessons, accessToken])

    if (isLessonPage) {
        return (
            <div className='lesson-sidebar'>
                <ul className='sidebar-list'>
                    <li className='sidebar-header'>
                        <GoBackButton
                            page={"Unit Page"}
                            topicTitle={null}
                            unitTitle={null}
                            className=".back-button-style"
                        />
                        Unit Page
                    </li>
                    {lessons.map((lesson) => (
                        <li className='list_item' style={{ margin: 0 }} key={lesson.id}>
                            <Link
                                to={`/curriculum/${URLService.slugify(unitTitle)}${
                                    topicTitle
                                        ? `/${URLService.slugify(topicTitle)}`
                                        : ''
                                }/${URLService.slugify(lesson.title)}`}
                            >
                                {lesson.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }    

    
    return (
        <div>
            {loading ? (
                <div className="spinner-container" style={{height: '550px'}}>
                    <div className="spinner" style={{height: '120px', width: '120px', border: '12px solid rgba(0, 0, 0, 0.1)'}}></div>
                </div>
                ) : (
                    <ul className="list">
                        {lessons.map((lesson) => (
                            <li
                                className={`list_item ${
                                    completedLessons[lesson.id] ? 'completed' : ''
                                }`}
                                key={lesson.id}
                            >
                                <Link
                                    to={`/curriculum/${URLService.slugify(unitTitle)}${
                                        topicTitle
                                            ? `/${URLService.slugify(topicTitle)}`
                                            : ''
                                    }/${URLService.slugify(lesson.title)}`}
                                >
                                    {lesson.title}
                                </Link>
                                {completedLessons[lesson.id] && (
                                    <div className="completion-indicator"></div>
                                )}
                            </li>
                        ))}
                    </ul>
            )}
        </div>
    )
   
}