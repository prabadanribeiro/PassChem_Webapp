import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, View, pdfjs } from 'react-pdf'
import ApiService from '../services/ApiService'
import '../styles/LanguageDropdown.css'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import LessonButtons from './LessonButtons'
import Cookies from 'js-cookie'
import api from '../services/AxiosServices'
import '../styles/Lesson.css'
import '../styles/Spinning.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function Lesson( {lesson, topicTitle, unitTitle, sidebarActive} ) {

    const [numPages, setNumPages] = useState(null)
    const [pages, setPages] = useState([])
    const [videos, setVideos] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [videoURL, setVideoURL] = useState()
    const [documentURL, setDocumentURL] = useState('') 
    const [isAnswerKey, setIsAnswerKey] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    const dropdownRef = useRef(null)
    const accessToken = Cookies.get('access_token')
    const refreshToken = Cookies.get('refresh_token')
    let docType = null
    let content = null

    const toggleDropdown = () => setIsVisible(!isVisible)

    useEffect(() => {
        if (lesson.video_title) {
            ApiService.GetVideosByLesson(lesson.id)
            .then(fetchedVideos =>{
                setVideos(fetchedVideos)
                setVideoURL(`https://www.youtube.com/embed/${fetchedVideos[0].url_id}`)
            })
            .catch(error => {
                console.error('Error in component fetching video_language:', error)
            })
        }
       
        if (lesson.worksheet) {
            docType = 'worksheet'
            setDocumentURL(`http://127.0.0.1:8000/${lesson[docType]}`)
        } else if (lesson.notes) {
            docType = 'notes'
            setDocumentURL(`http://127.0.0.1:8000/${lesson[docType]}`)
        }
        
        if (accessToken && refreshToken) {
            const fetchCompletionStatus = async () => {
                try {
                    const completionStatus = await ApiService.GetLessonCompletionStatus(lesson.id, accessToken)
                    setCompleted(completionStatus)
                } catch (error) {
                    console.error('Error fetching lesson completion status:', error)
                }
            }
            fetchCompletionStatus()
        }

        setLoading(false)

    }, [lesson, accessToken])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsVisible(false)
            }
        }  
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [dropdownRef])

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        let pageList = Array.from({ length: numPages }, (_, index) => index + 1)
        setPages(pageList)
    }

    const changeVideo = ({ url_id }) => {
        setVideoURL(`https://www.youtube.com/embed/${url_id}`)
    }    

    const toggleDocument = () => {
        if (!isAnswerKey) {
            setDocumentURL(`http://127.0.0.1:8000/${lesson.answer_key}`)
            setIsAnswerKey(true)
        } else {
            if (lesson.worksheet) 
                docType = 'worksheet'
            else if (lesson.notes) 
                docType = 'notes'
            setDocumentURL(`http://127.0.0.1:8000/${lesson[docType]}`)
            setIsAnswerKey(false)
        }   
    }

    const handleToggleCompletion = async () => {
        try {
            const response = await api.post(
                `mark_lesson_completed/${lesson.id}/`,
                { 
                  completed: !completed 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                }
            )
            if (response.data.status === 'success') {
                setCompleted(!completed)
                setMessage('Lesson completion status updated.')
            } else {
                setMessage('Error updating lesson completion status: ' + response.data.message)
            }
        } catch (error) {
            setMessage('Error updating lesson completion status: ' + error.message)
        }
    }    

    if (lesson.type === 'video') { 
        content = (
            <div className='video-lesson-container'>
                <iframe 
                    src={videoURL}
                    title="YouTube video player" 
                    className='video-player'
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
                {videos.length > 0 && (
                    <div className="dropdown" ref={dropdownRef}>
                        <button 
                            className={`dropbtn ${videos.length > 1 ? 'hoverable' : ''}`} 
                            onClick={toggleDropdown}
                        >
                            {videos[0].language}
                        </button>
                        {isVisible && videos.length > 1 && (
                            <div className="dropdown-content">
                                {videos.map(video => (
                                    <button onClick={() => changeVideo({ URL: video.url_id })}>{video.language}</button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                <div className='video-buttons-container'>
                    <LessonButtons lesson={lesson} topicTitle={topicTitle} unitTitle={unitTitle}/>
                </div>
            </div>
        )
    }

    if (lesson.type === 'text') {
        content = (
                <div className='docContainer'>
                    <h2>{lesson.title}</h2>
                    <Document className='text-pdf' file={documentURL} onLoadSuccess={onDocumentLoadSuccess}>
                        {pages.map(pagenumber =>
                            <Page className='page-scale'
                                key={pagenumber}
                                pageNumber={pagenumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                scale={1.0 /*Scale function not used here because transform-origin could not be targeted separately*/}
                                wrap={false}
                            >
                            </Page>
                        )}
                    </Document>
                    <div className='buttons-container'>
                            <LessonButtons lesson={lesson} topicTitle={topicTitle} unitTitle={unitTitle}/>
                            {!lesson.notes && <button className='answerKey-worksheet-button' onClick={toggleDocument}>{isAnswerKey ? "Worksheet" : "Answer Key"}</button>}
                        </div>
                </div>
        )
    }

    return (
        <>
            {loading ? (
                <div className="spinner-container" style={{height: '550px'}}>
                    <div className="spinner" style={{height: '120px', width: '120px', border: '12px solid rgba(0, 0, 0, 0.1)'}}></div>
                </div>
            ) : (
                <div className='lesson-content'>
                    {content}
                    { accessToken && refreshToken ? (<button onClick={handleToggleCompletion}>change completion</button>) : []}
                    { accessToken && refreshToken ? (completed ? <p>Lesson Completed</p> : <p>Lesson Not Completed</p>) : []}
                </div>
            )}
        </>
    )

}