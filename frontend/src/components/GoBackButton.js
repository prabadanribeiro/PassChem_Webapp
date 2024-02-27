import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GoBackButton({ page, topicTitle }) {

    let buttonType = null

    if (page === "Lesson") {
        buttonType = (
            <div>
                <Link to={`/topics/${encodeURIComponent(topicTitle)}`}>Go Back to Topic</Link>
            </div>
        )
    } else if (page === "Overview") {
        buttonType = (
            <div>
                <Link to={'/topics/'}>Go Back to Topics</Link>
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