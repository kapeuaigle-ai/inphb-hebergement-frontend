import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import { FaUserPlus, FaMagic, FaHistory, FaSearch, FaCheck, FaExclamationCircle } from 'react-icons/fa';
import { affectationService } from '../services/affectationService';
import { etudiantService } from '../services/etudiantService';
import { chambreService } from '../services/chambreService';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Affectations = () => {
    const [activeTab, setActiveTab] = useState('manuelle');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [compatibleRooms, setCompatibleRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [autoProgress, setAutoProgress] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const tabs = [
        { id: 'manuelle', label: 'Attribution Manuelle', icon: FaUserPlus },
        { id: 'automatique', label: 'Attribution Auto', icon: FaMagic },
        { id: 'historique', label: 'Historique', icon: FaHistory },
    ];

    const handleSearch = async (val) => {
        setSearchTerm(val);
        if (val.length > 2) {
            setIsSearching(true);
            try {
                const resp = await etudiantService.getAll({ search: val });
                setSearchResults(resp.data.filter(e =>
                    e.nom.toLowerCase().includes(val.toLowerCase()) ||
                    e.mat_etudiant.toLowerCase().includes(val.toLowerCase())
                ));
            } catch (error) {
                console.error("Search error", error);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSearchResults([]);
        }
    };

    const selectEtudiant = async (etudiant) => {
        setSelectedEtudiant(etudiant);
        setLoadingRooms(true);
        try {
            const resp = await chambreService.getDisponibles(etudiant.mat_etudiant);
            setCompatibleRooms(resp.data);
            if (resp.data.length === 0) {
                toast.info("Aucune chambre compatible trouvée pour le profil de cet étudiant.");
            }
        } catch (error) {
            toast.error("Erreur lors de la récupération des chambres compatibles");
        } finally {
            setLoadingRooms(false);
        }
    };

    const handleAssign = async (chambre) => {
        try {
            await affectationService.affecter({
                etudiant: selectedEtudiant.mat_etudiant,
                chambre: chambre.id_chambre,
                date_entree: new Date().toISOString().split('T')[0],
                annee_academique: '2024-2025'
            });
            toast.success(`Affectation réussie : ${selectedEtudiant.nom} -> ${chambre.id_chambre}`);
            setSelectedEtudiant(null);
            setSearchTerm('');
            setSearchResults([]);
        } catch (error) {
            const msg = error.response?.data?.error || "Erreur lors de l'affectation";
            toast.error(msg);
        }
    };

    const handleLaunchAuto = async () => {
        setIsProcessing(true);
        setAutoProgress(10);
        const interval = setInterval(() => {
            setAutoProgress(prev => {
                if (prev >= 90) {
                    clearInterval(interval);
                    return 90;
                }
                return prev + 10;
            });
        }, 500);

        try {
            await affectationService.lancerAttributionAuto();
            setAutoProgress(100);
            toast.success("Attribution automatique terminée avec succès !");
        } catch (error) {
            toast.error("Une erreur est survenue pendant l'attribution");
        } finally {
            setIsProcessing(false);
            clearInterval(interval);
        }
    };

    const mockHistorique = [
        { id: 1, etudiant: 'KOUASSI Jean', matricule: 'ETU001', chambre: 'A-15', date: '22/09/2025', batiment: 'A', status: 'VALIDE' },
        { id: 2, etudiant: 'TRAORE Awa', matricule: 'ETU002', chambre: 'G-42', date: '23/09/2025', batiment: 'G', status: 'VALIDE' },
    ];

    const columns = [
        { key: 'matricule', label: 'Matricule' },
        { key: 'etudiant', label: 'Étudiant' },
        { key: 'chambre', label: 'Chambre' },
        { key: 'batiment', label: 'Bâtiment' },
        { key: 'date', label: 'Date Affectation' },
        {
            key: 'status',
            label: 'Statut',
            render: (val) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${val === 'VALIDE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {val}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-text-primary">Système d'Affectation</h2>
                <p className="text-text-secondary">Attribuez des places aux étudiants manuellement ou automatiquement</p>
            </div>

            <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-50 self-start inline-flex">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSelectedEtudiant(null); }}
                        className={`flex items-center space-x-3 px-8 py-3 rounded-xl font-bold text-sm transition-preset ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'text-text-secondary hover:bg-gray-50'}`}
                    >
                        <tab.icon />
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 min-h-[500px] overflow-hidden">
                {activeTab === 'manuelle' && (
                    <div className="p-10 space-y-12">
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-8 underline decoration-blue-200 underline-offset-8">1. Sélectionner l'étudiant</h3>
                            <div className="relative max-w-xl">
                                <input
                                    type="text"
                                    placeholder="Entrez le nom ou le matricule de l'étudiant..."
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-preset shadow-inner"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <FaSearch className="absolute left-4 top-5 text-gray-400" />
                            </div>

                            {isSearching && <div className="mt-4 text-center"><LoadingSpinner /></div>}

                            {!isSearching && searchResults.length > 0 && (
                                <div className="mt-4 space-y-2 max-h-60 overflow-y-auto p-2 bg-gray-50 rounded-2xl border border-gray-100 animate-in slide-in-from-top-2">
                                    {searchResults.map(etu => (
                                        <div key={etu.mat_etudiant} className="p-4 bg-white rounded-xl flex items-center justify-between border border-gray-100 hover:border-primary/30 transition-preset">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-primary font-bold">
                                                    {etu.nom[0]}{etu.prenom[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-primary">{etu.nom} {etu.prenom} ({etu.mat_etudiant})</p>
                                                    <p className="text-[10px] text-text-secondary uppercase">{etu.niveau_etudes} - {etu.sexe === 'M' ? 'Masculin' : 'Féminin'}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => selectEtudiant(etu)}
                                                className="px-4 py-1.5 bg-primary/5 text-primary rounded-lg hover:bg-primary hover:text-white text-xs font-bold transition-preset"
                                            >
                                                Sélectionner
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {selectedEtudiant && (
                            <div className="animate-in fade-in duration-500">
                                <h3 className="text-xl font-bold text-primary mb-4 underline decoration-blue-200 underline-offset-8">2. Sélectionner une chambre compatible</h3>
                                <p className="mb-8 text-sm text-gray-400 italic">Affichage des chambres autorisées pour un étudiant de niveau {selectedEtudiant.niveau_etudes}</p>

                                {loadingRooms ? (
                                    <div className="py-20 text-center"><LoadingSpinner /></div>
                                ) : (
                                    <>
                                        {compatibleRooms.length > 0 && compatibleRooms.length <= 4 && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {compatibleRooms.map(chambre => (
                                                    <button
                                                        key={chambre.id_chambre}
                                                        onClick={() => handleAssign(chambre)}
                                                        className="p-6 border-2 border-gray-50 rounded-2xl text-left hover:border-primary hover:bg-blue-50/50 transition-preset group"
                                                    >
                                                        <div className="flex justify-between items-start mb-4">
                                                            <span className="text-2xl font-black text-primary">{chambre.id_chambre}</span>
                                                            <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-bold">{chambre.type_chambre}</span>
                                                        </div>
                                                        <p className="text-sm text-text-secondary">Bâtiment {chambre.id_chambre.split('-')[0]} - {chambre.etat_service}</p>
                                                        <div className="mt-4 flex items-center text-xs font-bold text-success opacity-0 group-hover:opacity-100 transition-preset">
                                                            <FaCheck className="mr-2" /> Affecter
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}

                                        {compatibleRooms.length > 4 && (
                                            <div className="max-w-xl space-y-4">
                                                <select
                                                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-preset shadow-inner font-bold text-primary appearance-none"
                                                    onChange={(e) => {
                                                        const room = compatibleRooms.find(r => r.id_chambre === e.target.value);
                                                        if (room) handleAssign(room);
                                                    }}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Choisir une chambre parmi les {compatibleRooms.length} options libres...</option>
                                                    {compatibleRooms.map(chambre => (
                                                        <option key={chambre.id_chambre} value={chambre.id_chambre}>
                                                            {chambre.id_chambre} ({chambre.type_chambre}) - Bâtiment {chambre.id_chambre.split('-')[0]}
                                                        </option>
                                                    ))}
                                                </select>
                                                <p className="text-[11px] text-text-secondary">
                                                    <FaExclamationCircle className="inline mr-1" />
                                                    Plus de 4 chambres sont disponibles, veuillez utiliser la liste déroulante ci-dessus.
                                                </p>
                                            </div>
                                        )}

                                        {compatibleRooms.length === 0 && (
                                            <div className="col-span-full py-10 bg-gray-50 rounded-2xl text-center text-gray-400">
                                                <FaExclamationCircle className="mx-auto mb-2 opacity-20" size={48} />
                                                <p>Aucune chambre libre ne correspond au profil de cet étudiant.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'automatique' && (
                    <div className="p-20 text-center space-y-8">
                        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-primary animate-pulse">
                            <FaMagic size={64} />
                        </div>
                        <div className="max-w-md mx-auto">
                            <h3 className="text-2xl font-bold text-primary mb-2">Attribution Automatisée</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Le système va analyser les critères (sexe, niveau, handicap, nationalité) et attribuer les places optimales pour tous les étudiants non logés.
                            </p>
                        </div>
                        {isProcessing || autoProgress > 0 ? (
                            <div className="max-w-xl mx-auto space-y-4">
                                <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${autoProgress}%` }}></div>
                                </div>
                                <p className="text-sm font-bold text-primary">{autoProgress === 100 ? 'Traitement terminé !' : 'Traitement des données en cours...'}</p>
                            </div>
                        ) : (
                            <button onClick={handleLaunchAuto} className="px-10 py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-secondary shadow-xl shadow-primary/20 transition-preset transform hover:-translate-y-1">
                                Lancer l'attribution automatique
                            </button>
                        )}
                    </div>
                )}

                {activeTab === 'historique' && (
                    <div className="p-6">
                        <DataTable columns={columns} data={mockHistorique} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Affectations;
