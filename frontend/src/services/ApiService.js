import axios from 'axios'

class ApiService {

    GetTopics () {
        return axios.get('http://127.0.0.1:8000/topics/')
            .then(res => {
                const topics = res.data
                topics.sort((a, b) => a.unit - b.unit)
                return topics
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetLesson () {
        return axios.get('http://127.0.0.1:8000/lesson/')
            .then(res => {
                const lesson = res.data
                return lesson
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }

    GetVideosByLesson(LessonId) {
        return axios.get('http://127.0.0.1:8000/video_language/')
            .then(res => {
                const videos = res.data
                const filteredVideos = videos.filter(video => video.video === LessonId)
                return filteredVideos
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }
    
}

export default new ApiService()