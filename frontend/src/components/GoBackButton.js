import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GoBackButton({ page, topicTitle }) {

    let buttonType = null

    const backButton = {
        position: 'absolute',
        top: '100px',
        left: '20px',
        height: '40px',
        width: '50px',
        borderRight: '3px solid rgb(145, 195, 239)',
        zIndex: '99'
    }

    if (page === "Lesson") {
        buttonType = (
            <div>
                <Link to={`/topics/${encodeURIComponent(topicTitle)}`} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    } else if (page === "Overview") {
        buttonType = (
            <div>
                <Link to={'/topics/'} style={backButton}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#111111"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg></Link>
            </div>
        )
    }


    return (
        <div>
            {buttonType}
        </div>
    )
}

export default GoBackButton;