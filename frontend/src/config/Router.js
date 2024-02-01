import React from 'react'
import { createHashRouter, Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import TopicsPage from '../pages/TopicsPage'
import ErrorPage from '../pages/ErrorPage'
import LessonPage from '../pages/LessonPage'
import LessonsOverview from '../pages/LessonsOverview'

const Root = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export const createRouter = (topics = [], lesson = []) => {

    // Initialize dynamicTopicsRoutes only if topics is not empty
    const dynamicTopicsRoutes = topics.length > 0 ? topics.map(topic => {
        const topicLessons = lesson.filter(lessonItem => lessonItem.topic === topic.id);
        return {
            path: `/topics/${encodeURIComponent(topic.title)}`,
            element: <LessonsOverview topicLessons={topicLessons} topicTitle={topic.title} topicUnit={topic.unit}/>,
        }
    }) : []

    // Initialize dynamicLessonRoutes only if both topics and lesson are not empty
    const dynamicLessonRoutes = topics.length > 0 && lesson.length > 0 ? topics.map(topic => {
        return lesson.filter(lessonItem => lessonItem.topic === topic.id)
            .map(lessonItem => {
                return {
                    path: `/topics/${encodeURIComponent(topic.title)}/${encodeURIComponent(lessonItem.title)}`,
                    element: <LessonPage />,
                };
        })
    }).flat() : []


    // Browser which creates paths for every page
    const router = createHashRouter([
        {
            path: "/",
            element: <Root />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "/about",
                    element: <About />,
                },
                {
                    path: "/topics",
                    element: <TopicsPage />,
                },
                ...dynamicTopicsRoutes,
                ...dynamicLessonRoutes,
            ],
        }
    ])

    return router
}