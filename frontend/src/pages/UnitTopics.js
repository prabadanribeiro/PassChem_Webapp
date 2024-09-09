import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GoBackButton from '../components/GoBackButton'
import Cookies from 'js-cookie'
import ApiService from '../services/ApiService'
import TopicsList from '../components/TopicsList'
import Footer from '../components/Footer'

export default function UnitTopics({ unitTopics, unitTitle, unitNumber, unit }) {

    const [progression, setProgression] = useState(null)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    const gradientParentStyle = {
        position: 'absolute',
        top: '-300px',
        left: '0',
        width: '100vw',
        height: '100vh',
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
            'radial-gradient(rgb(173, 231, 239) 33%, transparent 67%) -120px -24px no-repeat, ' +
            'radial-gradient(#629ef1 40%, transparent 70%) -470px 150px no-repeat, ' +
            'hsl(155, 70%, 70%)',
        zIndex: '-1',
    }

    const UnitHeader = {
        fontSize: '50px',
        textAlign: 'center',
        margin: '50px 0 0px 0',
        fontFamily: 'DM Sans',
    }

    useEffect(() => {
        if (accessToken && refreshToken) {
            const fetchProgression = async () => {
                try {
                    const progressionStatus = await ApiService.GetUnitProgressionStatus(unit.id, accessToken)
                    setProgression(progressionStatus)
                } catch (error) {
                    console.error('Error fetching progression status:', error)
                }
            };
            fetchProgression()
        }
    }, [unit, accessToken, refreshToken])

    return (
        <div>
            {/* Gradient Background */}
            <div style={gradientParentStyle}>
                <div style={gradientAfterStyle}></div>
            </div>

            <Navbar />
            <GoBackButton page={"Unit Page"} topicTitle={null} unitTitle={null} />
            <h1 style={UnitHeader}>{unitTitle}</h1>

            {accessToken && refreshToken && (
                <h3>Progression: {progression}%</h3>
            )}

            <TopicsList topics={unitTopics} unitTitle={unitTitle} />
        </div>
    )
}
