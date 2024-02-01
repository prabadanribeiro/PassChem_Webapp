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

    GetLessonsByTopic(topicID) {
        return axios.get('http://127.0.0.1:8000/lesson/')
            .then(res => {
                const lesson = res
                const filteredLessons = lesson.filter(lesson => lesson.topic === topicID)
                return filteredLessons
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }
}

export default new ApiService()