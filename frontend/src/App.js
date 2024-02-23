import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import ApiService from './services/ApiService'
import { createRouter } from './config/Router'

export default function App() {
    
    const [topics, setTopics] = useState(null);
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        Promise.all([ApiService.GetTopics(), ApiService.GetLesson()])
            .then(([fetchedTopics, fetchedLesson]) => {
                setTopics(fetchedTopics)
                setLesson(fetchedLesson)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
    }, [])

    if (topics === null || lesson === null) {
        return <div>Loading...</div>
    }

    const router = createRouter(topics, lesson); 

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}