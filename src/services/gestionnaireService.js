import api from './api';

export const gestionnaireService = {
    getAll: () => api.get('/gestionnaires/'),
    create: (data) => api.post('/gestionnaires/', data),
    update: (id, data) => api.put(`/gestionnaires/${id}/`, data),
    delete: (id) => api.delete(`/gestionnaires/${id}/`),
    assignerBatiments: (id, batiments) => api.patch(`/gestionnaires/${id}/`, { batiments })
};
