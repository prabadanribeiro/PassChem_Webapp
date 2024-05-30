import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({ // CHANGE ALL INSTANCES WHERE AXIOS IS BEING USED TO USE API AS IT WILL MAKE THE INTECEPTOR RUN EVERY TIME
    baseURL: 'http://127.0.0.1:8000/'
})

api.interceptors.request.use(
    config => {
        const token = Cookies.get('access_token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    error => Promise.reject(error)
)

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        if (error.response.status === 401 && originalRequest.headers['Authorization'] && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                const { data } = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {}, { withCredentials: true })
                Cookies.set('access_token', data.access, {secure: true,})
                api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`
                return api(originalRequest)
            } catch (refreshError) {
                Cookies.remove('access_token')
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)

export default api
