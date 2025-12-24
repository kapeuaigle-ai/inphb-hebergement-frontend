export const NIVEAUX_ETUDES = [
    { value: 'PREPA1', label: 'Classes Préparatoires 1' },
    { value: 'PREPA2', label: 'Classes Préparatoires 2' },
    { value: 'TS1', label: 'Technicien Supérieur 1' },
    { value: 'TS2', label: 'Technicien Supérieur 2' },
    { value: 'TS3', label: 'Technicien Supérieur 3' },
    { value: 'ING1', label: 'Cycle Ingénieur 1' },
    { value: 'ING2', label: 'Cycle Ingénieur 2' },
    { value: 'ING3', label: 'Cycle Ingénieur 3' },
    { value: 'MASTER1', label: 'Master 1' },
    { value: 'MASTER2', label: 'Master 2' },
];

export const BATIMENTS = 'ABCDEFGHJKLMNPRT'.split('').map(b => ({
    value: b,
    label: `Bâtiment ${b}`
}));

export const ETATS_CHAMBRE = {
    EN_SERVICE: 'En service',
    REPARATION: 'En réparation',
    HORS_SERVICE: 'Hors service'
};

export const ROLES = {
    ADMIN: 'Administrateur',
    GESTIONNAIRE: 'Gestionnaire'
};
