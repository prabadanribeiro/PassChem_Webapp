import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import ApiService from '../services/ApiService'
import '../styles/Topics.css'


export default function Topics () {
    
    const [topics, setTopics] = useState([])

    useEffect(() => {
        ApiService.GetTopics()
            .then(fetchedTopics => {
                setTopics(fetchedTopics)
            })
            .catch(error => {
                console.error('Error in component fetching topics:', error)
            })
    }, [])

    return (
        <div className='topics-body'>
            <h3>General Chem Curriculum</h3>
            <hr></hr>
            <div className='topics-container'>
                { // use topics.img
                    topics.map(topic =>
                        <Link to={`/topics/${encodeURIComponent(topic.title)}`} className='link'>
                            <div className='topics-cards'>
                                <img className="topics-images" src={`http://127.0.0.1:8000/${topic.img}`} alt='Unit Images'/>
                                <div className='topics-description'>
                                    <p>{/* needs topic.description */}Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                            <l1 key={topic.unit} className="card-content">
                                <h4>
                                    Unit {topic.unit}:  
                                </h4>
                                <h4>
                                    &nbsp;{topic.title} 
                                </h4>
                            </l1>
                        </Link>
                    )
                }
            </div>
        </div>
    )
}