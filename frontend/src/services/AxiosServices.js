import axios from 'axios';
import Cookies from 'js-cookie';
import rateLimit from 'axios-rate-limit';


const api = rateLimit(
    axios.create({
        baseURL: 'http://127.0.0.1:8000/',
    }),
    { maxRequests: 5, perMilliseconds: 1000 }
);

api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && originalRequest.headers['Authorization'] && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const { data } = await axios.post('http://127.0.0.1:8000/api/users/token/refresh/', {}, { withCredentials: true });
                
                Cookies.set('access_token', data.access, { secure: true });
                api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                
                return api(originalRequest);
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError);

                Cookies.remove('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        console.error('API request error:', error);

        return Promise.reject(error);
    }
);

export default api;
