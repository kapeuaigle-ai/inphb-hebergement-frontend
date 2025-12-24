import api from './api';

export const authService = {
    login: (username, password) => api.post('/auth/login/', { username, password }),
    logout: () => api.post('/auth/logout/'),
    refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
    getCurrentUser: () => api.get('/auth/me/')
};
