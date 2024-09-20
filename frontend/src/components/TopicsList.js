import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'
import ApiService from '../services/ApiService'
import Cookies from 'js-cookie'
import '../styles/LessonOverview.css'

export default function TopicsList( {topics, unitTitle}) {

    const [completedTopics, setCompletedTopics] = useState({})
    const [loading, setLoading] = useState(true)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    useEffect(() => {
        const fetchCompletionStatus = async () => {
            const status = {}
            for (const topic of topics) {
                try {
                    const progress = await ApiService.GetTopicProgressionStatus(topic.id, accessToken)
                    if (progress >= 100) {
                        status[topic.id] = progress
                    }   
                } catch (error) {
                    console.error(`Error fetching completion status for lesson ${topic.id}:`, error)
                }
            }
            setCompletedTopics(status)
        }
        if (accessToken && refreshToken) {
            fetchCompletionStatus()
        }
        setLoading(false)
    }, [topics, accessToken])
    
    return (
        <div>
            {loading ? (
                <div className="spinner-container" style={{height: '550px'}}>
                    <div className="spinner" style={{height: '120px', width: '120px', border: '12px solid rgba(0, 0, 0, 0.1)'}}></div>
                </div>
                ) : (
                <ul className="list">
                    {topics.map((topic) => (
                        <li
                            className={`list_item ${completedTopics[topic.id] ? 'completed' : ''}`}
                            key={topic.id}
                        >
                            <Link
                                to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topic.title)}`}
                            >
                                {topic.title}
                            </Link>
                            {completedTopics[topic.id] && <div className="completion-indicator"></div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

    
}