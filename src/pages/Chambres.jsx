import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chambreService } from '../services/chambreService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { toast } from 'react-toastify';
import { FaBed, FaTools, FaTimesCircle, FaUsers } from 'react-icons/fa';

const Chambres = () => {
    const navigate = useNavigate();
    const [selectedBatiment, setSelectedBatiment] = useState('A');
    const [chambres, setChambres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedChambre, setSelectedChambre] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('ALL');

    const batiments = 'ABCDEFGHJKLMNPTR'.split('');

    const statusFilters = [
        { id: 'ALL', label: 'TOUTES', color: 'bg-gray-200', textColor: 'text-gray-800', borderColor: 'border-gray-300' },
        { id: 'DISPONIBLE', label: 'DISPONIBLE', color: 'bg-green-500', textColor: 'text-white', borderColor: 'border-green-500' },
        { id: 'OCCUPEE', label: 'OCCUPÉE / PLEINE', color: 'bg-red-500', textColor: 'text-white', borderColor: 'border-red-500' },
        { id: 'REPARATION', label: 'RÉPARATION', color: 'bg-orange-500', textColor: 'text-white', borderColor: 'border-orange-500' },
        { id: 'HORS_SERVICE', label: 'HORS SERVICE', color: 'bg-gray-500', textColor: 'text-white', borderColor: 'border-gray-500' }
    ];

    const fetchChambres = async () => {
        setLoading(true);
        try {
            const response = await chambreService.getByBatiment(selectedBatiment);
            setChambres(response.data);
        } catch (error) {
            console.error("Fetch chambres error", error);
            toast.error("Erreur lors du chargement des chambres");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChambres();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBatiment]);

    const getStatusColor = (chambre) => {
        if (chambre.etat_service === 'REPARATION' || chambre.etat_service === 'EN_REPARATION') return 'bg-orange-500';
        if (chambre.etat_service === 'HORS_SERVICE') return 'bg-gray-500';

        const isFull = (chambre.occupants?.length || 0) >= (chambre.capacite || 1);
        return isFull ? 'bg-red-500' : 'bg-green-500';
    };

    const getStatusLabel = (chambre) => {
        if (chambre.etat_service === 'REPARATION' || chambre.etat_service === 'EN_REPARATION') return 'En réparation';
        if (chambre.etat_service === 'HORS_SERVICE') return 'Hors service';
        return (chambre.occupants?.length || 0) > 0 ? 'Occupée' : 'Disponible';
    };

    const getChambreStatus = (chambre) => {
        if (chambre.etat_service === 'REPARATION' || chambre.etat_service === 'EN_REPARATION') return 'REPARATION';
        if (chambre.etat_service === 'HORS_SERVICE') return 'HORS_SERVICE';
        const isFull = (chambre.occupants?.length || 0) >= (chambre.capacite || 1);
        return isFull ? 'OCCUPEE' : 'DISPONIBLE';
    };

    const filteredChambres = statusFilter === 'ALL'
        ? chambres
        : chambres.filter(chambre => getChambreStatus(chambre) === statusFilter);

    const getStatusCount = (status) => {
        if (status === 'ALL') return chambres.length;
        return chambres.filter(chambre => getChambreStatus(chambre) === status).length;
    };

    // Grouper les chambres par palier
    const chambresByPalier = filteredChambres.reduce((acc, chambre) => {
        const numChambre = parseInt(chambre.id_chambre.split('-')[1]); // Extraire le numéro
        let palierKey;
        if (numChambre >= 1 && numChambre <= 32) {
            palierKey = 'R0';
        } else if (numChambre >= 33 && numChambre <= 64) {
            palierKey = 'R1';
        } else if (numChambre >= 65 && numChambre <= 96) {
            palierKey = 'R2';
        }
        if (palierKey) {
            if (!acc[palierKey]) acc[palierKey] = [];
            acc[palierKey].push(chambre);
        }
        return acc;
    }, {});

    const palierKeys = Object.keys(chambresByPalier).sort();

    const updateChambreStatus = async (id, newEtat) => {
        try {
            await chambreService.updateEtat(id, newEtat);
            toast.success(`Chambre ${id} passée en ${newEtat}`);
            fetchChambres();
            setIsModalOpen(false);
        } catch (error) {
            toast.error("Erreur lors de la mise à jour de l'état");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Vue des Chambres - Bâtiment {selectedBatiment}</h2>
                    <p className="text-text-secondary">Visualisez l'état de toutes les chambres du bâtiment en temps réel</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                {batiments.map(b => (
                    <button
                        key={b}
                        onClick={() => setSelectedBatiment(b)}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-preset border ${selectedBatiment === b ? 'bg-secondary text-white border-secondary shadow-lg' : 'bg-white text-text-secondary border-gray-100 hover:border-primary hover:text-primary'}`}
                    >
                        {b}
                    </button>
                ))}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex flex-wrap items-center gap-3 mb-8 pb-4 border-b border-gray-100">
                    {statusFilters.map(filter => {
                        const count = getStatusCount(filter.id);
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setStatusFilter(filter.id)}
                                className={`flex items-center px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-preset border-2 ${
                                    statusFilter === filter.id
                                        ? `${filter.color} ${filter.textColor} ${filter.borderColor} shadow-md scale-105`
                                        : `bg-white text-gray-600 border-gray-200 hover:${filter.borderColor} hover:shadow-sm`
                                }`}
                            >
                                <div className={`w-3 h-3 ${filter.color} rounded-full mr-2`}></div>
                                {filter.label}
                                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                                    statusFilter === filter.id
                                        ? 'bg-white bg-opacity-30'
                                        : 'bg-gray-100'
                                }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {loading ? (
                    <div className="py-20"><LoadingSpinner /></div>
                ) : (
                    <>
                        <div className="mb-6 text-sm text-gray-600">
                            <span className="font-bold text-lg">{filteredChambres.length}</span> chambre{filteredChambres.length > 1 ? 's' : ''} {statusFilter === 'ALL' ? 'au total' : statusFilters.find(f => f.id === statusFilter)?.label.toLowerCase()}
                        </div>

                        {palierKeys.map((palierKey) => (
                            <div key={palierKey} className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-lg">
                                        Palier {palierKey}
                                    </h3>
                                    <div className="flex-1 h-px bg-gray-200"></div>
                                    <span className="text-xs text-gray-500 font-medium">
                                        {chambresByPalier[palierKey].length} chambre{chambresByPalier[palierKey].length > 1 ? 's' : ''}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                                    {chambresByPalier[palierKey].map(chambre => (
                                        <button
                                            key={chambre.id_chambre}
                                            onClick={() => { setSelectedChambre(chambre); setIsModalOpen(true); }}
                                            className={`group relative h-16 rounded-xl flex flex-col items-center justify-center text-white font-black shadow-sm transform hover:scale-105 hover:z-10 transition-preset ${getStatusColor(chambre)}`}
                                        >
                                            <span className="text-xs opacity-70 mb-0.5">{chambre.id_chambre.split('-')[1]}</span>
                                            <span className="text-lg">{chambre.id_chambre.split('-')[0]}</span>

                                            {/* Tooltip */}
                                            <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 bg-gray-900 text-white p-2 rounded text-[10px] leading-tight z-20">
                                                <p className="font-bold border-b border-gray-700 mb-1 pb-1">{chambre.id_chambre}</p>
                                                <p>{chambre.type_chambre}</p>
                                                <p>{getStatusLabel(chambre)}</p>
                                                <p>{chambre.occupants?.length || 0} / {chambre.capacite} places</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Chambre Details Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`Détails Chambre ${selectedChambre?.id_chambre}`}
                size="md"
            >
                {selectedChambre && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-text-secondary font-bold uppercase mb-1">Bâtiment / Palier</p>
                                <p className="text-lg font-bold text-primary">{selectedChambre.id_chambre}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-text-secondary font-bold uppercase mb-1">Type de chambre</p>
                                <p className="text-lg font-bold text-primary">{selectedChambre.type_chambre}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-text-secondary font-bold uppercase mb-1">État actuel</p>
                                <p className={`text-sm font-black px-2 py-0.5 rounded-full inline-block mt-1 bg-white border ${getStatusColor(selectedChambre).replace('bg-', 'text- border-')}`}>
                                    {getStatusLabel(selectedChambre).toUpperCase()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-xs text-text-secondary font-bold uppercase mb-1">Capacité</p>
                                <p className="text-lg font-bold text-primary">{selectedChambre.capacite} places</p>
                            </div>
                        </div>

                        <div className="border border-gray-100 rounded-xl p-4">
                            <h4 className="font-bold text-text-primary mb-4 flex items-center">
                                <FaUsers className="mr-2 text-primary" /> Occupants actuels
                            </h4>
                            {selectedChambre.occupants?.length > 0 ? (
                                <ul className="space-y-2">
                                    {selectedChambre.occupants.map((occ, i) => (
                                        <li key={i} className="flex items-center justify-between p-3 bg-white border border-gray-50 rounded-lg">
                                            <span className="font-medium">{occ.nom}</span>
                                            <button
                                                onClick={() => {
                                                    setIsModalOpen(false);
                                                    navigate(`/etudiants`); // Alternatively, search for him
                                                    toast.info(`Navigation vers le profil de ${occ.nom}`);
                                                }}
                                                className="text-primary hover:underline text-xs font-bold"
                                            >
                                                Voir profil
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-400 italic text-center py-4">Aucun occupant pour le moment</p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                            <button
                                disabled={selectedChambre.occupants?.length >= selectedChambre.capacite || selectedChambre.etat_service !== 'EN_SERVICE'}
                                onClick={() => navigate('/affectations')}
                                className="flex-1 flex items-center justify-center space-x-2 bg-primary disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold hover:bg-secondary transition-preset"
                            >
                                <FaBed /> <span>Affecter étudiant</span>
                            </button>
                            <button
                                onClick={() => updateChambreStatus(selectedChambre.id_chambre, 'EN_REPARATION')}
                                className="flex-1 flex items-center justify-center space-x-2 bg-orange-50 text-orange-600 border border-orange-100 py-3 rounded-xl font-bold hover:bg-orange-100 transition-preset"
                            >
                                <FaTools /> <span>Mettre en réparation</span>
                            </button>
                            <button
                                onClick={() => updateChambreStatus(selectedChambre.id_chambre, 'HORS_SERVICE')}
                                className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl font-bold hover:bg-red-100 transition-preset"
                            >
                                <FaTimesCircle /> <span>Hors service</span>
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Chambres;
