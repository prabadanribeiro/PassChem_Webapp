import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import GoBackButton from '../components/GoBackButton'
import ProgressBar from '../components/ProgressBar'
import Cookies from 'js-cookie'
import ApiService from '../services/ApiService'
import TopicsList from '../components/TopicsList'
import LessonList from '../components/LessonList'
import '../styles/Progression.css'

export default function UnitTopics({ unitTopics, unitLessons, unitTitle, unitNumber, unit }) {

    const [progress, setProgress] = useState(0)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

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
    }

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
            'radial-gradient(rgb(143, 231, 239) 33%, transparent 67%) -120px -24px no-repeat, ' +
            'radial-gradient(#629ef1 40%, transparent 70%) -470px 150px no-repeat, ' +
            'hsl(155, 70%, 70%)',
        zIndex: '-1',
    }

    const UnitHeader = {
        fontSize: '50px',
        textAlign: 'center',
        marginTop: '65px',
        fontFamily: 'DM Sans',
        fontWeight: '550',
        isolation: 'isolate'
    }

    console.log(unit)

    useEffect(() => {
        if (accessToken && refreshToken) {
            const fetchProgression = async () => {
                try {
                    console.log(unit.id)
                    const progressionStatus = await ApiService.GetUnitProgressionStatus(unit.id, accessToken)
                    setProgress(progressionStatus)
                } catch (error) {
                    console.error('Error fetching progression status:', error)
                }
            }
            fetchProgression()
        }
    }, [unit, accessToken, refreshToken])

    return (
        <div>
            <Helmet>
                <title>{unitTitle}</title>
                <meta name='description' content={`Explore the lessons in ${unitTitle}, which come with premium videos and worksheets`}/>
            </Helmet>
            <div style={gradientParentStyle}>
                <div style={gradientAfterStyle}></div>
            </div>
            <Navbar />
            <GoBackButton page={"Unit Page"} topicTitle={null} unitTitle={null} />
            <h2 style={UnitHeader}>{unitTitle}</h2>
            {accessToken && refreshToken && (
                <div className="progress-container">
                    <div className="progress-inner">
                        <h3>Progression: {progress}%</h3>
                        <ProgressBar progress={progress} />
                    </div>
                </div>
            )}
            {
                // make it so depending on which is null, either load the lessons or topics
                unitTopics.length > 0 ? (
                    <>
                        <TopicsList topics={unitTopics} unitTitle={unitTitle} />
                    </>
                ) : unitLessons.length > 0 ? (
                    <>
                        <LessonList lessons={unitLessons} unitTitle={unitTitle} topicTitle={null}/>
                    </>
                ) : (
                    <p>No topics or lessons available.</p>
                )
            }
            
        </div>
    )
}
