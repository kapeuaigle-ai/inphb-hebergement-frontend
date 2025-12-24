import React from 'react';
import { useForm } from 'react-hook-form';
import { NIVEAUX_ETUDES } from '../../utils/constants';

const EtudiantForm = ({ onSubmit, initialData, onCancel }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            mat_etudiant: '',
            nom: '',
            prenom: '',
            sexe: 'M',
            nationalite: 'Ivoirienne',
            telephone: '',
            email: '',
            ecole: 'ESI',
            filiere: '',
            niveau_etudes: 'ING1',
            est_handicape: false,
            est_international: false,
            etat_etudiant: 'ACTIF'
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Matricule</label>
                    <input
                        {...register('mat_etudiant', { required: 'Le matricule est requis' })}
                        disabled={!!initialData}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.mat_etudiant ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset disabled:opacity-50`}
                        placeholder="Ex: 23INP001"
                    />
                    {errors.mat_etudiant && <p className="text-danger text-xs mt-1 font-bold">{errors.mat_etudiant.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Sexe</label>
                    <select
                        {...register('sexe', { required: 'Le sexe est requis' })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset"
                    >
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                    <input
                        {...register('nom', { required: 'Le nom est requis' })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.nom ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="Nom de l'étudiant"
                    />
                    {errors.nom && <p className="text-danger text-xs mt-1 font-bold">{errors.nom.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                    <input
                        {...register('prenom', { required: 'Le prénom est requis' })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.prenom ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="Prénom de l'étudiant"
                    />
                    {errors.prenom && <p className="text-danger text-xs mt-1 font-bold">{errors.prenom.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: "L'email est requis" })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="etudiant@example.com"
                    />
                    {errors.email && <p className="text-danger text-xs mt-1 font-bold">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                    <input
                        {...register('telephone', { required: 'Le téléphone est requis' })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.telephone ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="0707070707"
                    />
                    {errors.telephone && <p className="text-danger text-xs mt-1 font-bold">{errors.telephone.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">École</label>
                    <input
                        {...register('ecole', { required: "L'école est requise" })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset"
                        placeholder="Ex: ESI, ESTP..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Filière</label>
                    <input
                        {...register('filiere', { required: 'La filière est requise' })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset"
                        placeholder="Ex: Informatique"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Niveau</label>
                    <select
                        {...register('niveau_etudes', { required: 'Le niveau est requis' })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset"
                    >
                        {NIVEAUX_ETUDES.map(niv => (
                            <option key={niv.value} value={niv.value}>{niv.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('est_handicape')}
                        className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm font-bold text-gray-700">Étudiant Handicapé</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                        type="checkbox"
                        {...register('est_international')}
                        className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300"
                    />
                    <span className="text-sm font-bold text-gray-700">Étudiant International</span>
                </label>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-preset"
                >
                    Annuler
                </button>
                <button
                    type="submit"
                    className="px-8 py-3 bg-primary hover:bg-secondary text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-preset"
                >
                    {initialData ? 'Mettre à jour' : 'Enregistrer'}
                </button>
            </div>
        </form>
    );
};

export default EtudiantForm;
