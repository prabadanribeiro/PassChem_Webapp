import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import LessonList from '../components/LessonList'
import GoBackButton from '../components/GoBackButton'
import ApiService from '../services/ApiService'
import Cookies from 'js-cookie'

export default function TopicPage( {unitTitle, topicTitle, topicLessons, topic} ) {

    const [progression, setProgression] = useState(null)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    useEffect(() => {
        if (accessToken && refreshToken) {
            const fetchProgression = async () => {
                try {
                    const progressionStatus = await ApiService.GetTopicProgressionStatus(topic.id, accessToken)
                    setProgression(progressionStatus)
                } catch (error) {
                    console.error('Error fetching progression status:', error)
                }
            }
            fetchProgression()
        }
    }, [topic, accessToken, refreshToken])
    
    return (
        <div>
            <Navbar />
            <GoBackButton page={"Topic Page"} topicTitle={topicTitle} unitTitle={unitTitle}/>
            <div>
                <h1 className='topic-title'>{topicTitle}</h1>
            </div>
            {accessToken && refreshToken ? (<h3>Progression: {progression}%</h3>) : []}
            <LessonList topicTitle={topicTitle} lessons={topicLessons} unitTitle={unitTitle}/>
        </div>
    )

}