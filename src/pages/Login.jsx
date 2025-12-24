import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaLock, FaEnvelope, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);
        try {
            await login(username, password);
            toast.success('Connexion réussie !');
            navigate('/');
        } catch (error) {
            console.error(error);
            const errorMsg = error.response?.data?.detail || 'Identifiants incorrects';
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        setIsLoading(true);
        try {
            await login('admin', 'admin123');
            toast.success('Connexion en mode démo réussie !');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Erreur lors de la connexion en mode démo. Assurez-vous que le backend est démarré.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-500">
                <div className="bg-secondary p-10 text-center text-white">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3 hover:rotate-0 transition-preset">
                        <span className="text-primary font-black text-3xl">INP</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Hébergement INP-HB</h1>
                    <p className="text-blue-200 mt-2 text-sm font-medium">Connectez-vous à votre espace</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Identifiant / Email</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-preset text-sm"
                                placeholder="Nom d'utilisateur ou email"
                                required
                            />
                            <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Mot de passe</label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-preset text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary border-gray-300" />
                            <span className="text-sm text-gray-500 group-hover:text-gray-700">Se souvenir de moi</span>
                        </label>
                        <button type="button" className="text-sm font-bold text-primary hover:text-accent transition-preset">
                            Mot de passe oublié ?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-primary hover:bg-secondary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-preset flex items-center justify-center space-x-3 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Connexion en cours...</span>
                            </>
                        ) : (
                            <span>Se Connecter</span>
                        )}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400">Ou tester rapidement</span></div>
                    </div>

                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={isLoading}
                        className="w-full py-3 bg-gray-50 hover:bg-gray-100 text-primary rounded-xl font-bold text-sm border border-gray-100 transition-preset flex items-center justify-center space-x-2 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" />
                                <span>Connexion...</span>
                            </>
                        ) : (
                            <span>Connexion Mode Démo (Sans Back-end)</span>
                        )}
                    </button>
                </form>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-xs text-text-secondary">
                        Système Intégré de Gestion de l'Hébergement &copy; 2025
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
