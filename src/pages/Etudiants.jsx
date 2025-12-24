import React, { useState, useEffect } from 'react';
import DataTable from '../components/common/DataTable';
import FilterBar from '../components/common/FilterBar';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { etudiantService } from '../services/etudiantService';
import { FaPlus, FaEdit, FaTrash, FaUserSlash, FaUserCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EtudiantForm from '../components/forms/EtudiantForm';
import { NIVEAUX_ETUDES, BATIMENTS } from '../utils/constants';

const Etudiants = () => {
    const [etudiants, setEtudiants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ sexe: '', niveau_etudes: '', etat_etudiant: '', batiment: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedEtudiant, setSelectedEtudiant] = useState(null);

    const fetchEtudiants = async () => {
        setLoading(true);
        try {
            const response = await etudiantService.getAll(filters);
            setEtudiants(response.data);
        } catch (error) {
            console.error("Erreur chargement étudiants", error);
            toast.error("Erreur lors du chargement des étudiants");
            setEtudiants([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEtudiants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleResetFilters = () => {
        setFilters({ sexe: '', niveau_etudes: '', etat_etudiant: '', batiment: '' });
    };

    const handleFormSubmit = async (data) => {
        try {
            if (selectedEtudiant) {
                await etudiantService.update(selectedEtudiant.mat_etudiant, data);
                toast.success("Étudiant mis à jour avec succès");
            } else {
                await etudiantService.create(data);
                toast.success("Étudiant ajouté avec succès");
            }
            setIsModalOpen(false);
            fetchEtudiants();
        } catch (error) {
            console.error("Erreur soumission formulaire", error);
            const msg = error.response?.data?.detail || "Erreur lors de l'enregistrement";
            toast.error(msg);
        }
    };

    const handleDelete = async () => {
        try {
            await etudiantService.delete(selectedEtudiant.mat_etudiant);
            toast.success("Étudiant supprimé avec succès");
            setIsConfirmOpen(false);
            fetchEtudiants();
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleToggleStatus = async (etudiant) => {
        try {
            if (etudiant.etat_etudiant === 'ACTIF') {
                await etudiantService.suspendre(etudiant.mat_etudiant);
                toast.info("Étudiant suspendu");
            } else {
                await etudiantService.debloquer(etudiant.mat_etudiant);
                toast.success("Étudiant débloqué");
            }
            fetchEtudiants();
        } catch (error) {
            toast.error("Erreur lors du changement de statut");
        }
    };

    const columns = [
        { key: 'mat_etudiant', label: 'Matricule', className: 'font-bold' },
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'sexe', label: 'Sexe' },
        { key: 'niveau_etudes', label: 'Niveau' },
        { key: 'chambre', label: 'Chambre', render: (val) => val || <span className="text-gray-400 italic">Non affecté</span> },
        {
            key: 'etat_etudiant',
            label: 'État',
            render: (val) => (
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${val === 'ACTIF' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {val}
                </span>
            )
        },
    ];

    const actions = (etudiant) => (
        <>
            <button
                onClick={() => { setSelectedEtudiant(etudiant); setIsModalOpen(true); }}
                className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-preset"
                title="Modifier"
            >
                <FaEdit />
            </button>
            <button
                onClick={() => { handleToggleStatus(etudiant); }}
                className={`p-2 rounded-lg transition-preset ${etudiant.etat_etudiant === 'ACTIF' ? 'text-warning hover:bg-orange-50' : 'text-success hover:bg-green-50'}`}
                title={etudiant.etat_etudiant === 'ACTIF' ? 'Suspendre' : 'Débloquer'}
            >
                {etudiant.etat_etudiant === 'ACTIF' ? <FaUserSlash /> : <FaUserCheck />}
            </button>
            <button
                onClick={() => { setSelectedEtudiant(etudiant); setIsConfirmOpen(true); }}
                className="p-2 text-danger hover:bg-red-50 rounded-lg transition-preset"
                title="Supprimer"
            >
                <FaTrash />
            </button>
        </>
    );

    const filterOptions = [
        { name: 'sexe', label: 'Sexe', options: [{ value: 'M', label: 'Masculin' }, { value: 'F', label: 'Féminin' }] },
        {
            name: 'niveau_etudes', label: 'Niveau', options: NIVEAUX_ETUDES
        },
        { name: 'etat_etudiant', label: 'État', options: [{ value: 'ACTIF', label: 'Actif' }, { value: 'SUSPENDU', label: 'Suspendu' }] },
        { name: 'batiment', label: 'Bâtiment', options: BATIMENTS }
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">Gestion des Étudiants</h2>
                    <p className="text-text-secondary">Gérez les informations et les statuts des étudiants</p>
                </div>
                <button
                    onClick={() => { setSelectedEtudiant(null); setIsModalOpen(true); }}
                    className="flex items-center px-6 py-3 bg-primary hover:bg-secondary text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-preset"
                >
                    <FaPlus className="mr-2" /> Ajouter un étudiant
                </button>
            </div>

            <FilterBar
                filters={filterOptions.map(f => ({ ...f, value: filters[f.name] }))}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            {loading ? (
                <LoadingSpinner />
            ) : (
                <DataTable
                    columns={columns}
                    data={etudiants}
                    actions={actions}
                />
            )}

            {/* Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedEtudiant ? "Modifier l'étudiant" : "Nouveau étudiant"}
                size="lg"
            >
                <div className="p-6">
                    <EtudiantForm
                        onSubmit={handleFormSubmit}
                        initialData={selectedEtudiant}
                        onCancel={() => setIsModalOpen(false)}
                    />
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Supprimer l'étudiant ?"
                message={`Êtes-vous sûr de vouloir supprimer ${selectedEtudiant?.nom} ${selectedEtudiant?.prenom} ? Cette action est irréversible.`}
                onConfirm={handleDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default Etudiants;
