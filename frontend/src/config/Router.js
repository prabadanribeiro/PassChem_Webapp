import React from 'react'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import UnitsPage from '../pages/UnitsPage'
import ErrorPage from '../pages/ErrorPage'
import TopicPage from '../pages/TopicPage'
import UnitTopics from '../pages/UnitTopics'
import LoginPage from '../pages/LoginPage'
import LessonPage from '../pages/LessonPage'
import SignupPage from '../pages/SignupPage'
import URLService from '../services/URLService'
import ProfilePage from '../pages/ProfilePage'

const Root = () => {
    return (
        <>
            <div>
                <Outlet />
            </div>
        </>
    )
}

export const createRouter = (units = [], topics = [], lessons = []) => {
    
    const dynamicUnitsRoutes = units.length > 0 ? units.map(unit => {
        const unitSlug = URLService.slugify(unit.title)
        const unitTopics = topics.filter(topic => topic.unit === unit.id)
        return {
            path: `/curriculum/${unitSlug}`,
            element: <UnitTopics unitTitle={unit.title} unitTopics={unitTopics} unitNumber={unit.unit_number} unit={unit} />,
        }
    }) : []

    const dynamicTopicRoutes = topics.length > 0 && units.length > 0 ? topics.map(topic => {
        const unit = units.find(unit => unit.id === topic.unit)
        const unitSlug = URLService.slugify(unit.title)
        const topicSlug = URLService.slugify(topic.title)
        const topicLessons = lessons.filter(lesson => lesson.topic === topic.id)
        return {
            path: `/curriculum/${unitSlug}/${topicSlug}`,
            element: <TopicPage unitTitle={unit.title} topicTitle={topic.title} topicLessons={topicLessons} topic={topic}/>,
        }
    }).flat() : []

    const dynamicLessonRoutes = lessons.length > 0 && topics.length > 0 && units.length > 0 ? lessons.map(lesson => {
        const topic = topics.find(topic => topic.id === lesson.topic)
        const unit = units.find(unit => unit.id === topic.unit)
        const unitSlug = URLService.slugify(unit.title)
        const topicSlug = URLService.slugify(topic.title)
        const lessonSlug = URLService.slugify(lesson.title)
        const topicLessons = lessons.filter(lessonItem => lessonItem.topic === topic.id)
        return {
            path: `/curriculum/${unitSlug}/${topicSlug}/${lessonSlug}`,
            element: <LessonPage lesson={lesson} unitTitle={unit.title} topicTitle={topic.title} topicLessons={topicLessons} />,
        }
    }).flat() : []

    console.log('Units Routes:', dynamicUnitsRoutes)
    console.log('Topics Routes:', dynamicTopicRoutes)
    console.log('Lessons Routes:', dynamicLessonRoutes)

    const router = createBrowserRouter([
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
                    path: "/curriculum",
                    element: <UnitsPage />,
                },
                {
                    path: "/login",
                    element: <LoginPage />,
                },
                {
                    path: "/signup",
                    element: <SignupPage />,
                },
                {
                    path: "/profile",
                    element: <ProfilePage />,
                },
                ...dynamicUnitsRoutes,
                ...dynamicTopicRoutes,
                ...dynamicLessonRoutes,
            ],
        }
    ])

    console.log(router)

    return router
}
