import api from './api';

export const etudiantService = {
    getAll: (params) => api.get('/etudiants/', { params }),
    getById: (mat) => api.get(`/etudiants/${mat}/`),
    create: (data) => api.post('/etudiants/', data),
    update: (mat, data) => api.put(`/etudiants/${mat}/`, data),
    delete: (mat) => api.delete(`/etudiants/${mat}/`),
    suspendre: (mat) => api.post(`/etudiants/${mat}/suspendre/`),
    debloquer: (mat) => api.post(`/etudiants/${mat}/debloquer/`)
};
