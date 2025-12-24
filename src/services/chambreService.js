import api from './api';

export const chambreService = {
    getAll: () => api.get('/chambres/'),
    getByBatiment: (id) => api.get(`/chambres/batiment/${id}/`),
    getByPalier: (id) => api.get(`/chambres/palier/${id}/`),
    getById: (id) => api.get(`/chambres/${id}/`),
    updateEtat: (id, etat) => api.patch(`/chambres/${id}/etat/`, { etat_service: etat }),
    getDisponibles: (mat) => api.get(`/chambres/disponibles/${mat}/`)
};
