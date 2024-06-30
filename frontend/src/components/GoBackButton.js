import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'

function GoBackButton({ page, topicTitle, unitTitle }) {

    let buttonType = null

    const backButton = {
        position: 'absolute',
        top: '108px',
        left: '40px',

        borderRight: '3px solid #111',
        borderBottom: '3px solid #111',
    }

    if (page === "Lesson Page") {
        buttonType = (
            <div>
                <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topicTitle)}`} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
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
                <Link to={'/curriculum'} style={backButton}>Go Back to Curriculum</Link>
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