import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { FaUserPlus, FaEdit, FaTrash, FaCog, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import GestionnaireForm from '../components/forms/GestionnaireForm';

const Admin = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedGestionnaire, setSelectedGestionnaire] = useState(null);

    const mockGestionnaires = [
        { id: 1, nom: 'KOUAME', prenom: 'Paul', email: 'paul.kouame@inphb.ci', batiments: 'A, B, H, M', role: 'GESTIONNAIRE' },
        { id: 2, nom: 'YAO', prenom: 'Marie', email: 'marie.yao@inphb.ci', batiments: 'G, J, K, L', role: 'GESTIONNAIRE' },
        { id: 3, nom: 'ADMINISTRATEUR', prenom: 'Principal', email: 'admin@inphb.ci', batiments: 'TOUS', role: 'ADMIN' },
    ];

    const columns = [
        { key: 'id', label: 'ID' },
        { key: 'nom', label: 'Nom' },
        { key: 'prenom', label: 'Prénom' },
        { key: 'email', label: 'Email' },
        {
            key: 'batiments',
            label: 'Bâtiments',
            render: (val) => (
                <div className="flex flex-wrap gap-1">
                    {val.split(',').map((b, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">
                            {b.trim()}
                        </span>
                    ))}
                </div>
            )
        },
        {
            key: 'role',
            label: 'Rôle',
            render: (val) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-black ${val === 'ADMIN' ? 'bg-primary text-white' : 'bg-blue-100 text-primary'}`}>
                    {val}
                </span>
            )
        },
    ];

    return (
        <div className="space-y-12 pb-20">
            <section>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-text-primary">Administration</h2>
                        <p className="text-text-secondary">Gérez les comptes des gestionnaires et leurs accès</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center px-6 py-3 bg-primary hover:bg-secondary text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-preset"
                    >
                        <FaUserPlus className="mr-2" /> Ajouter un gestionnaire
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
                    <DataTable
                        columns={columns}
                        data={mockGestionnaires}
                        actions={(item) => (
                            <>
                                <button
                                    onClick={() => { setSelectedGestionnaire(item); setIsModalOpen(true); }}
                                    className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-preset"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => { setSelectedGestionnaire(item); setIsDeleteOpen(true); }}
                                    className="p-2 text-danger hover:bg-red-50 rounded-lg transition-preset"
                                >
                                    <FaTrash />
                                </button>
                            </>
                        )}
                    />
                </div>
            </section>

            <section>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-text-primary">Configuration Système</h2>
                    <p className="text-text-secondary">Paramètres globaux de l'année académique</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center">
                            <FaCalendarAlt className="text-primary mr-3" /> Année Académique Active
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Année en cours</p>
                                    <p className="text-lg font-black text-primary">2024 - 2025</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-preset">Changer</button>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                                <div>
                                    <p className="text-xs font-bold text-gray-500 uppercase">Date limite dépôt clés</p>
                                    <p className="text-lg font-black text-primary">15 Juin 2025</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold hover:bg-primary hover:text-white transition-preset">Modifier</button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50">
                        <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center">
                            <FaCog className="text-primary mr-3" /> Paramètres d'Affectation
                        </h3>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-preset">
                                <div>
                                    <p className="font-bold text-sm">Priorité Handicap</p>
                                    <p className="text-xs text-text-secondary">Affectation automatique prioritaire</p>
                                </div>
                                <input type="checkbox" defaultChecked className="w-6 h-6 rounded text-primary" />
                            </label>
                            <label className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl cursor-pointer hover:bg-gray-50 transition-preset">
                                <div>
                                    <p className="font-bold text-sm">Mixité Bâtiments</p>
                                    <p className="text-xs text-text-secondary">Autoriser les bâtiments mixtes</p>
                                </div>
                                <input type="checkbox" className="w-6 h-6 rounded text-primary" />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* Admin Modals */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedGestionnaire ? "Modifier Gestionnaire" : "Nouveau Gestionnaire"}
                size="md"
            >
                <div className="p-6">
                    <GestionnaireForm
                        initialData={selectedGestionnaire}
                        onCancel={() => setIsModalOpen(false)}
                        onSubmit={(data) => {
                            console.log("Submit gestionnaire", data);
                            toast.success(selectedGestionnaire ? "Gestionnaire mis à jour" : "Gestionnaire créé");
                            setIsModalOpen(false);
                        }}
                    />
                </div>
            </Modal>

            <ConfirmDialog
                isOpen={isDeleteOpen}
                title="Supprimer le gestionnaire ?"
                message={`Voulez-vous vraiment retirer les accès à ${selectedGestionnaire?.nom} ? Ses données seront conservées mais il ne pourra plus se connecter.`}
                onConfirm={() => { toast.success("Accès révoqués"); setIsDeleteOpen(false); }}
                onCancel={() => setIsDeleteOpen(false)}
            />
        </div>
    );
};

export default Admin;
