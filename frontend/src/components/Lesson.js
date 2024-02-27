import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
import GoBackButton from './GoBackButton'
import LessonButtons from './LessonButtons'

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function Lesson( {lesson, topicTitle} ) {

    const [numPages, setNumPages] = useState(null)
    const [pages, setPages] = useState([])

    const documentURL = `http://127.0.0.1:8000/${lesson.document}`
    let content = null

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        let pageList = Array.from({ length: numPages }, (_, index) => index + 1);
        setPages(pageList)
    }

    if (lesson.type === 'video') {
        content = (
            <iframe width="560" 
                height="315" 
                src={lesson.video_url} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
            </iframe>
        )
    }

    if (lesson.type === 'text') {
        content = (
            <div>
                <Document file={documentURL} onLoadSuccess={onDocumentLoadSuccess}>
                    {pages.map(pagenumber =>
                        <Page 
                            pageNumber={pagenumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />
                    )}
                </Document>
            </div>
        )
    }

    return (
        <div>
            <GoBackButton page={"Lesson"} topicTitle={topicTitle}/>
            <h1>LESSON</h1>
            <h1>{lesson.title}</h1>
            {content}
            <LessonButtons lesson={lesson} topicTitle={topicTitle}/>
        </div>
    )

}