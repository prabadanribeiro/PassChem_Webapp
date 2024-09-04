import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
})

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

        // Check if the error is a 401 Unauthorized and we have an Authorization header
        if (error.response.status === 401 && originalRequest.headers['Authorization'] && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Try refreshing the access token using the refresh token
                const { data } = await axios.post('http://127.0.0.1:8000/api/users/token/refresh/', {}, { withCredentials: true });
                
                // Log the new access token
                console.log('New access token:', data.access);

                // Set the new access token in the cookies and headers
                Cookies.set('access_token', data.access, { secure: true });
                api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
                originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
                
                // Retry the original request with the new access token
                return api(originalRequest);
            } catch (refreshError) {
                // Log refresh token failure
                console.error('Refresh token failed:', refreshError);

                // Clear cookies and redirect to login page if refresh fails
                Cookies.remove('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Log all other errors
        console.error('API request error:', error);

        return Promise.reject(error);
    }
);

export default api;
