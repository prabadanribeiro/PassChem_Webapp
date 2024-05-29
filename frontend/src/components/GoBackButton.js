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
    } else if (page === "Topic Page") {
        buttonType = (
            <div>
                <Link to={`/curriculum/${URLService.slugify(unitTitle)}`}>Go Back to Unit</Link>
            </div>
        )
    } else if (page === "Unit Page") {
        buttonType = (
            <div>
                <Link to={'/curriculum'}>Go Back to Curriculum</Link>
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