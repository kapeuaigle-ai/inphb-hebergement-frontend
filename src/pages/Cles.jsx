import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import StatCard from '../components/common/StatCard';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { FaKey, FaHandHolding, FaBell, FaInfoCircle } from 'react-icons/fa';
import { cleService } from '../services/cleService';
import { toast } from 'react-toastify';

const Cles = () => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isSuspensionConfirmOpen, setIsSuspensionConfirmOpen] = useState(false);
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);

    const mockCles = [
        { mat_etudiant: 'ETU001', nom: 'KOUASSI Jean', chambre: 'A-15', batiment: 'A', est_international: 'NON', date_limite: '15/06/2025' },
        { mat_etudiant: 'ETU005', nom: 'DIALLO Fatou', chambre: 'G-42', batiment: 'G', est_international: 'OUI', date_limite: '15/06/2025' },
        { mat_etudiant: 'ETU012', nom: 'CAMARA Moussa', chambre: 'B-08', batiment: 'B', est_international: 'NON', date_limite: '15/06/2025' },
    ];

    const handleDepot = async () => {
        try {
            await cleService.enregistrerDepot(selectedEtudiant.mat_etudiant);
            toast.success(`Dépôt de clé enregistré pour ${selectedEtudiant.nom}`);
            setIsConfirmOpen(false);
        } catch (error) {
            toast.error("Erreur lors de l'enregistrement du dépôt");
        }
    };

    const handleLaunchSuspensions = async () => {
        try {
            await cleService.declencherSuspensions();
            toast.warning("Procédure de suspension terminée");
            setIsSuspensionConfirmOpen(false);
        } catch (error) {
            toast.error("Échec du lancement des suspensions");
        }
    };

    const columns = [
        { key: 'mat_etudiant', label: 'Matricule' },
        { key: 'nom', label: 'Étudiant' },
        { key: 'chambre', label: 'Chambre' },
        { key: 'batiment', label: 'Bât.' },
        {
            key: 'est_international',
            label: 'International',
            render: (val) => (
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${val === 'OUI' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                    {val}
                </span>
            )
        },
        { key: 'date_limite', label: 'Date Limite' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Gestion des Clés</h2>
                    <p className="text-text-secondary">Suivi des remises et dépôts de clés en fin d'année</p>
                </div>

                <div className="flex space-x-4">
                    <div className="bg-white px-6 py-3 rounded-2xl border border-blue-100 flex items-center space-x-4">
                        <div className="p-3 bg-blue-50 text-primary rounded-xl"><FaBell size={20} /></div>
                        <div>
                            <p className="text-[10px] font-bold text-text-secondary uppercase">Date limite</p>
                            <p className="text-sm font-black text-primary">15 Juin 2025</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSuspensionConfirmOpen(true)}
                        className="flex items-center space-x-3 px-8 py-3 bg-danger hover:bg-red-700 text-white rounded-2xl font-bold shadow-lg shadow-red-200 transition-preset"
                    >
                        <FaBell className="animate-bounce" />
                        <span>Déclencher suspensions</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Clés" value="1,856" icon={FaKey} color="primary" />
                <StatCard title="Clés Déposées" value="1,811" icon={FaHandHolding} color="success" />
                <StatCard title="Clés Manquantes" value="45" icon={FaInfoCircle} color="danger" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-text-primary">Clés non déposées</h3>
                </div>
                <DataTable
                    columns={columns}
                    data={mockCles}
                    actions={(item) => (
                        <button
                            onClick={() => { setSelectedEtudiant(item); setIsConfirmOpen(true); }}
                            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-secondary transition-preset flex items-center"
                        >
                            <FaHandHolding className="mr-2" /> ENREGISTRER DÉPÔT
                        </button>
                    )}
                />
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Enregistrer le dépôt ?"
                message={`Confirmez-vous que l'étudiant ${selectedEtudiant?.nom} a bien rendu ses clés ?`}
                onConfirm={handleDepot}
                onCancel={() => setIsConfirmOpen(false)}
                type="info"
            />

            <ConfirmDialog
                isOpen={isSuspensionConfirmOpen}
                title="Lancer les suspensions ?"
                message="Attention : Cette action suspendra automatiquement tous les étudiants n'ayant pas rendu leurs clés à ce jour. Un email de notification leur sera envoyé."
                onConfirm={handleLaunchSuspensions}
                onCancel={() => setIsSuspensionConfirmOpen(false)}
                type="danger"
            />
        </div>
    );
};

export default Cles;
