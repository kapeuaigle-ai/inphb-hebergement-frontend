import api from './api';

export const rapportService = {
    getDashboard: () => api.get('/rapports/dashboard/'),
    getTauxOccupation: () => api.get('/rapports/occupation/'),
    getRepartition: () => api.get('/rapports/repartition/'),
    exportPDF: () => api.get('/rapports/export/pdf/', { responseType: 'blob' }),
    exportExcel: () => api.get('/rapports/export/excel/', { responseType: 'blob' })
};
