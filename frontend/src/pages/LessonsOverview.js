import React, { useEffect, useState } from 'react'

const LessonsOverview = ( {topicLessons, topicUnit, topicTitle} ) => {
    
    return (
        <div>
            <h1>{topicUnit}</h1>
            <h1>{topicTitle}</h1>
            {
                topicLessons.map(lesson => 
                    <div>
                        <h1>{lesson.title}</h1>
                    </div>
                    
                )
            }
        </div>
    )

}

export default LessonsOverview