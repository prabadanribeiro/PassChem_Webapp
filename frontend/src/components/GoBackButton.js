import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'

function GoBackButton({ page, topicTitle, unitTitle }) {

    let buttonType = null

    if (page === "Lesson Page") {
        buttonType = (
            <div>
                <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}`}>Go Back to Topic</Link>
            </div>
        )
    }
    const backButton = {
        position: 'absolute',
        top: '110px',
        left: '20px',
        height: '40px',
        width: '50px',
        borderRight: '3px solid hsl(208, 90%, 95%)',
        zIndex: '99'
    }

    if (page === "Lesson") {
        buttonType = (
            <div>
                <Link to={`/topics/${encodeURIComponent(topicTitle)}`} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    } else if (page === "Topic Page") {
        buttonType = (
            <div>
                <Link to={`/curriculum/${URLService.slugify(unitTitle)}`} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    } else if (page === "Unit Page") {
        buttonType = (
            <div>
                <Link to={'/curriculum'} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    } else if (page === "Subtopic Page") {
        buttonType = (
            <div>
                <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}/${URLService.slugify(lesson.title)}`} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    }

    return (
        <div>
            {buttonType}
        </div>
    )
}

export default GoBackButton