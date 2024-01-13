import React from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'

export default class Topics extends React.Component {
    
    state = {
        topics: []
      }
    
    componentDidMount() {
        axios.get('http://127.0.0.1:8000/topics/')
            .then(res => {
                const topics = res.data
                topics.sort((a, b) => a.unit - b.unit)
                this.setState({ topics })
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        return (
            <div>
                <Navbar />
                {
                    this.state.topics.map(topics =>
                        <l1 key={topics.unit}>
                            <h1>
                                Title: {topics.title}  
                            </h1>
                            <h1>
                                Unit: {topics.unit}
                            </h1>
                        </l1>
                    )
                }
            </div>
        )
    }
}