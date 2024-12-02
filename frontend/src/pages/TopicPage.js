import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import LessonList from '../components/LessonList'
import GoBackButton from '../components/GoBackButton'
import ProgressBar from '../components/ProgressBar'
import ApiService from '../services/ApiService'
import Cookies from 'js-cookie'

export default function TopicPage( {unitTitle, topicTitle, topicLessons, topic} ) {

    const [progress, setProgress] = useState(0)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const topicsHeader = {
        fontSize: '50px',
        textAlign: 'center',
        margin: '65px 0 40px 0',
        fontFamily: 'DM Sans', 
        fontWeight: '550',
        isolation: 'isolate'
    }

    
    const gradientParentStyle = {
        position: 'absolute',
        top: '90px', 
        left: '0',
        width: '100%',
        height: '300px',
        transformOrigin: '0 60%',
        transform: 'skewY(-8deg)',
        overflow: 'hidden',
        zIndex: '-1',
    };

    const gradientAfterStyle = {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        minWidth: '1000px',
        width: '100%',
        height: '100%',
        background:
            'radial-gradient(#8de0e9 40%, transparent 60%) -620px -180px no-repeat, ' +
            'radial-gradient(rgb(108, 231, 239) 33%, transparent 67%) -120px -24px no-repeat, ' +
            'radial-gradient(#629ef1 40%, transparent 70%) -470px 150px no-repeat, ' +
            'hsl(155, 70%, 70%)',
        zIndex: '-1',
    };

    useEffect(() => {
        if (accessToken && refreshToken) {
            const fetchProgression = async () => {
                try {
                    const progressionStatus = await ApiService.GetTopicProgressionStatus(topic.id, accessToken)
                    setProgress(progressionStatus)
                } catch (error) {
                    console.error('Error fetching progression status:', error)
                }
            }
            fetchProgression()
        }
    }, [topic, accessToken, refreshToken])
    
    return (
        <div>
            <Helmet>
                <title>{topicTitle}</title>
                <meta name='description' content='In each PassChem topic, find material to work through in an easy, linear fashion' />
            </Helmet>
            <div style={gradientParentStyle}>
                <div style={gradientAfterStyle}></div>
            </div>
            
            <Navbar />
            <GoBackButton page={"Topic Page"} topicTitle={topicTitle} unitTitle={unitTitle}/>
            <h2 style={topicsHeader}>{topicTitle}</h2>
            {accessToken && refreshToken && (
                <div className="progress-container">
                    <div className="progress-inner">
                        <h3>Progression: {progress}%</h3>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            )}
            <LessonList topicTitle={topicTitle} lessons={topicLessons} unitTitle={unitTitle} topic={topic}/>
        </div>
    )

}