import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import GoBackButton from '../components/GoBackButton'
import Cookies from 'js-cookie' 
import ApiService from '../services/ApiService'
import TopicsList from '../components/TopicsList'

export default function UnitTopics( {unitTopics, unitTitle, unitNumber, unit} ) {

    const [progression, setProgression] = useState(null)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')

    useEffect(() => {
        if (accessToken && refreshToken) {
            const fetchProgression = async () => {
                try {
                    const progressionStatus = await ApiService.GetUnitProgressionStatus(unit.id, accessToken)
                    setProgression(progressionStatus)
                } catch (error) {
                    console.error('Error fetching progression status:', error)
                }
            }
            fetchProgression()
        }
    }, [unit, accessToken, refreshToken])

    return (
        <div>
            <Navbar />
            <GoBackButton page={"Unit Page"} topicTitle={null} unitTitle={null}/>
            {accessToken && refreshToken ? (<h3>Progression: {progression}%</h3>) : []}
            <TopicsList topics={unitTopics} unitTitle={unitTitle} />
        </div>
    )
}