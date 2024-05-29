import axios from 'axios'
import api from './AxiosServices'

class ApiService {

    GetUnits = async () => {
        return api.get('api/unit/')
            .then(res => {
                const units = res.data
                units.sort((a, b) => a.unit_number - b.unit_number)
                return units
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetTopics = async () => {
        return api.get('api/topic/')
            .then(res => {
                const topics = res.data
                topics.sort((a, b) => a.topic_number - b.topic_number)
                return topics
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetLessons = async () => {
        return api.get('api/lesson/')
            .then(res => {
                const lesson = res.data
                lesson.sort((a, b) => a.lesson_number - b.lesson_number)
                return lesson
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetVideosByLesson = async (LessonId) => {
        return api.get('api/video_setting/')
            .then(res => {
                const videos = res.data
                const filteredVideos = videos.filter(video => video.video === LessonId)
                return filteredVideos
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetLessonCompletionStatus = async (lessonID, accessToken) => {
        return api.get(`user_lesson/${lessonID}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                const completion = res.data.completed
                return completion
            })
            .catch(error => {
                console.error('Error fetching lesson completion status:', error)
            })
    }

    GetTopicProgressionStatus = async (topicID, accessToken) => {
        return api.get(`user_topic/${topicID}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                const progression = res.data.progression.toFixed(1)
                return parseFloat(progression)
            })
            .catch(error => {
                console.error('Error fetching lesson completion status:', error)
                throw error
            })
    }

    GetUnitProgressionStatus = async (userID, accessToken) => {
        return api.get(`user_unit/${userID}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            })
            .then(res => {
                const progression = res.data.progression.toFixed(1)
                return parseFloat(progression)
            })
            .catch(error => {
                console.error('Error fetching lesson completion status:', error)
                throw error
            })
    }
    
}

export default new ApiService()