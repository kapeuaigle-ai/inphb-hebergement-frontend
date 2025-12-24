import api from './api';

export const batimentService = {
    getAll: () => api.get('/batiments/'),
    getById: (id) => api.get(`/batiments/${id}/`),
    getWithPaliers: (id) => api.get(`/batiments/${id}/paliers/`)
};
