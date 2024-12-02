import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import ApiService from './services/ApiService'
import { createRouter } from './config/Router'

export default function App() {
    
    const [units, setUnits] = useState(null)
    const [topics, setTopics] = useState(null)
    const [lessons, setLessons] = useState(null)

    useEffect(() => {
        Promise.all([ApiService.GetUnits(), ApiService.GetTopics(), ApiService.GetLessons()])
            .then(([fetchedUnits, fetchedTopics, fetchedLessons]) => {
                setUnits(fetchedUnits)
                setTopics(fetchedTopics)
                setLessons(fetchedLessons)
                console.log(fetchedUnits)
                console.log(fetchedTopics)
                console.log(fetchedLessons)
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [])

    if (units === null || topics === null || lessons === null) {
        return <div>Loading...</div>
    }

    const router = createRouter(units, topics, lessons)

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}