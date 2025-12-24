import api from './api';

export const cleService = {
    getNonDeposees: () => api.get('/cles/non-deposees/'),
    enregistrerDepot: (mat) => api.post(`/cles/deposer/${mat}/`),
    declencherSuspensions: () => api.post('/cles/suspensions/')
};
