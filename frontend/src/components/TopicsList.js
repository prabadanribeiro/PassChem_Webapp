import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import URLService from '../services/URLService';
import ApiService from '../services/ApiService';
import Cookies from 'js-cookie';
import '../styles/LessonOverview.css';

/**
 * TopicsList component displays a list of topics within a specific unit.
 * It indicates which topics have been completed based on the user's progress.
 * 
 * Props:
 * - topics: Array of topic objects to be displayed.
 * - unitTitle: Title of the unit, used for generating topic links.
 * 
 * State:
 * - completedTopics: Object that tracks the completion status of each topic.
 * - loading: Boolean indicating if the data is still being fetched.
 */
export default function TopicsList({ topics, unitTitle }) {
  const [completedTopics, setCompletedTopics] = useState({});
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get('access_token');
  const refreshToken = Cookies.get('refresh_token');

  useEffect(() => {
    /**
     * Fetches the completion status for each topic and updates the
     * completedTopics state. If the user's progress for a topic
     * is 100%, it is marked as completed.
     */
    const fetchCompletionStatus = async () => {
      const status = {};
      for (const topic of topics) {
        try {
          if (topic != null) {
            // Retrieve the completion status for the topic
            const progress = await ApiService.GetTopicProgressionStatus(topic.id, accessToken);
            if (progress >= 100) {
              // Mark topic as completed if progress is 100%
              status[topic.id] = progress;
            }   
          }
        } catch (error) {
          console.error(`Error fetching completion status for topic ${topic.id}:`, error);
        }
        }
        // Update the state with the completion status of topics
      setCompletedTopics(status);
    };

    // Initiate data fetching only if access tokens are available
    if (accessToken && refreshToken) {
        fetchCompletionStatus();
    }

    // Loading state should be set to false after the fetch attempt
    setLoading(false);
  }, [topics, accessToken]);

    return (
        <div>
            {loading ? (
                // Display loading spinner while fetching data
                <div className="spinner-container" style={{ height: '550px' }}>
                    <div className="spinner" style={{ height: '120px', width: '120px', border: '12px solid rgba(0, 0, 0, 0.1)' }}></div>
                </div>
            ) : (
                // Render the list of topics with completion indicators
                <ul className="list">
                    {topics.map((topic) => (
                        <li
                            className={`list_item ${completedTopics[topic.id] ? 'completed' : ''}`}
                            key={topic.id}
                        >
                            <Link
                                to={`/curriculum/${URLService.slugify(unitTitle)}/${URLService.slugify(topic.title)}`}
                            >
                                {topic.title}
                            </Link>
                            {completedTopics[topic.id] && <div className="completion-indicator"></div>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}