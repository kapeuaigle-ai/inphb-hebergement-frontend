import React from 'react';
import { useForm } from 'react-hook-form';
import { BATIMENTS } from '../../utils/constants';

const GestionnaireForm = ({ onSubmit, initialData, onCancel }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: initialData || {
            nom: '',
            prenom: '',
            email: '',
            contact: '',
            mot_de_passe: '',
            role: 'GESTIONNAIRE',
            batiments: []
        }
    });

    const selectedRole = watch('role');

    const onFormSubmit = (data) => {
        // If role is ADMIN, clear buildings selection
        if (data.role === 'ADMIN') {
            data.batiments = [];
        }
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                    <input
                        {...register('nom', { required: 'Le nom est requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.nom ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="Nom du gestionnaire"
                    />
                    {errors.nom && <p className="text-danger text-xs mt-1 font-bold">{errors.nom.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                    <input
                        {...register('prenom', { required: 'Le prénom est requis', minLength: { value: 2, message: 'Minimum 2 caractères' } })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.prenom ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="Prénom du gestionnaire"
                    />
                    {errors.prenom && <p className="text-danger text-xs mt-1 font-bold">{errors.prenom.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                    <input
                        {...register('email', {
                            required: "L'email est requis",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email invalide' }
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.email ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="nom.prenom@inphb.ci"
                    />
                    {errors.email && <p className="text-danger text-xs mt-1 font-bold">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Contact</label>
                    <input
                        {...register('contact', {
                            required: 'Le contact est requis',
                            pattern: { value: /^[0-9]{10}$/, message: 'Doit contenir 10 chiffres' }
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.contact ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="0102030405"
                    />
                    {errors.contact && <p className="text-danger text-xs mt-1 font-bold">{errors.contact.message}</p>}
                </div>
            </div>

            {!initialData && (
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                    <input
                        type="password"
                        {...register('mot_de_passe', {
                            required: 'Le mot de passe est requis',
                            minLength: { value: 8, message: 'Minimum 8 caractères' },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[0-9])/,
                                message: 'Doit contenir au moins une majuscule et un chiffre'
                            }
                        })}
                        className={`w-full px-4 py-3 bg-gray-50 border ${errors.mot_de_passe ? 'border-danger' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset`}
                        placeholder="••••••••"
                    />
                    {errors.mot_de_passe && <p className="text-danger text-xs mt-1 font-bold">{errors.mot_de_passe.message}</p>}
                </div>
            )}

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Rôle</label>
                <select
                    {...register('role', { required: 'Le rôle est requis' })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-preset"
                >
                    <option value="GESTIONNAIRE">Gestionnaire</option>
                    <option value="ADMIN">Administrateur</option>
                </select>
            </div>

            {selectedRole === 'GESTIONNAIRE' && (
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bâtiments assignés (max 4)</label>
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        {BATIMENTS.map((bat) => (
                            <label key={bat.value} className="flex flex-col items-center p-2 rounded-lg cursor-pointer hover:bg-white transition-preset">
                                <input
                                    type="checkbox"
                                    value={bat.value}
                                    {...register('batiments', {
                                        validate: (val) => val.length <= 4 || 'Maximum 4 bâtiments'
                                    })}
                                    className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300 mb-1"
                                />
                                <span className="text-[10px] font-bold text-gray-600">{bat.value}</span>
                            </label>
                        ))}
                    </div>
                    {errors.batiments && <p className="text-danger text-xs mt-1 font-bold">{errors.batiments.message}</p>}
                </div>
            )}

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

export default GestionnaireForm;
