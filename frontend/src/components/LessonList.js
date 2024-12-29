import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'
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

    const [sidebarActive, sidebarInactive] = useState()
    function toggleSidebar(){
        sidebarInactive(!sidebarActive)
    }

    if (isLessonPage) {
        return (
            <div className='lesson-sidebar' style={{width: sidebarActive ? '0px' : '265px'}}>
                <div className='sidebar-absolute' style={{left: sidebarActive ? '0px' : '-265px'}}>
                    <div className='toggle-sidebar' onClick={toggleSidebar}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" style={{transform: `rotate(${sidebarActive ? 180 : 0}deg) translateX(${sidebarActive ? 5 : 0}px)`, transition: 'transform 150ms linear', fill: '#555'}}><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg></div>
                    <ul className='sidebar-list' style={{opacity: sidebarActive ? 0 : 1}}>
                        <li className='sidebar-header'>
                            <h4>{topicTitle}</h4>
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