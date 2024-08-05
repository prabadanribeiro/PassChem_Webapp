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

    const topicsHeader = {
        fontSize: '50px',
        textAlign: 'center',
        margin: '50px 0 40px 0',
        fontFamily: 'DM Sans'
    }

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
            <h2 style={topicsHeader}>{topicTitle}</h2>
            {accessToken && refreshToken ? (<h3>Progression: {progression}%</h3>) : []}
            <LessonList topicTitle={topicTitle} lessons={topicLessons} unitTitle={unitTitle}/>
        </div>
    )

}