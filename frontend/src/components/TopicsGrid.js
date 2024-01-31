import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import ApiService from '../services/ApiService';
import '../styles/Topics.css'


export default function Topics () {
    
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        ApiService.GetTopics()
            .then(fetchedTopics => {
                setTopics(fetchedTopics);
            })
            .catch(error => {
                console.error('Error in component fetching topics:', error)
            })
    }, [])

    return (
        <div>
            <h2 className='topics-header'>Topics Collection</h2>
            <div className='topics-container'>
                { // use topics.img
                    topics.map(topic =>
                        <l1 key={topic.unit} className="topics-cards">
                            <Link to={`/topics/${encodeURIComponent(topic.title)}`}>
                                <h1 className='cards-header'>
                                    {topic.title}  
                                </h1>
                                <h1 className='cards-unit'>
                                    Unit: {topic.unit}
                                </h1>
                            </Link>
                        </l1>
                    )
                }
            </div>
        </div>
    )
}