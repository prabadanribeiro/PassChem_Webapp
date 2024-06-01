import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, View, pdfjs } from 'react-pdf'
import ApiService from '../services/ApiService'
import '../styles/LanguageDropdown.css'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import GoBackButton from './GoBackButton'
import LessonButtons from './LessonButtons'
import '../styles/Lesson.css'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function Lesson( {lesson, topicTitle} ) {

    const [numPages, setNumPages] = useState(null)
    const [pages, setPages] = useState([])
    const [videos, setVideos] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [videoURL, setVideoURL] = useState()
    const [documentURL, setDocumentURL] = useState('')
    const [isAnswerKey, setIsAnswerKey] = useState(false)
    const dropdownRef = useRef(null)
    let content = null

    const toggleDropdown = () => setIsVisible(!isVisible)

    useEffect(() => {
        ApiService.GetVideosByLesson(lesson.id)
            .then(fetchedVideos =>{
                setVideos(fetchedVideos)
                setVideoURL(`https://www.youtube.com/embed/${fetchedVideos[0].url_id}`)
            })
            .catch(error => {
                console.error('Error in component fetching video_language:', error)
            })
        setDocumentURL(`http://127.0.0.1:8000/${lesson.document}`)
    }, [lesson])

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
            setDocumentURL(`http://127.0.0.1:8000/${lesson.document}`)
            setIsAnswerKey(false)
        }   
    }

    if (lesson.type === 'video') { 
        content = (
            <div>
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
                <iframe 
                    className='video-player'
                    width="560" 
                    height="315" 
                    src={videoURL}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen>
                </iframe>
            </div>
        )
    }

    if (lesson.type === 'text') {
        content = (
            <div>
                <div>
                    <Document file={documentURL} onLoadSuccess={onDocumentLoadSuccess} className='text-pdf'>
                        {pages.map(pagenumber =>
                            <Page 
                                key={pagenumber}
                                pageNumber={pagenumber}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                scale={1.3}
                                wrap={false}
                            >
                            </Page>
                        )}
                    </Document>
                </div>
                <div>
                    <button onClick={toggleDocument}>{isAnswerKey ? "Worksheet" : "Answer Key"}</button>
                </div>
            </div>
        )
    }

    return (
            <div className='lesson-content'>
                <h2>LESSON {lesson.title}</h2>
                {content}
                <LessonButtons lesson={lesson} topicTitle={topicTitle}/> 
            </div>
         // IN THE FUTURE REPLACE LESSON BUTTONS WITH ARROWS WITH THE SAME FUNCTION
    )

}