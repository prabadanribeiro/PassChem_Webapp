import React from 'react'
import { Link } from 'react-router-dom'
import URLService from '../services/URLService'

export default function TopicsList( {topics, unitTitle}) { // ADD DROPDOWN MENU FOR EACH TOPIC WHERE ALL LESSONS ASSOCIATED APPEAR
    
    return (
        <div>
            <ul className='list'>
                {
                    topics.map(topic => 
                        <li className='list_item' key={topic.id}>
                            <Link to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topic.title)}`}>
                                {topic.title}
                            </Link> 
                        </li>
                    )
                }
            </ul>
        </div>
    )
}