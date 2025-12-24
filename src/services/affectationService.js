import api from './api';

export const affectationService = {
    affecter: (data) => api.post('/affectations/', data),
    liberer: (id) => api.delete(`/affectations/${id}/`),
    changer: (id, data) => api.put(`/affectations/${id}/changer/`, data),
    getHistorique: (params) => api.get('/affectations/historique/', { params }),
    lancerAttributionAuto: () => api.post('/affectations/auto/')
};
