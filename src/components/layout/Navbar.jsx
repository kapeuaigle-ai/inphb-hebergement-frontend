import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';

const Navbar = () => {
    const { user } = useAuth();

    return (
        <header className="h-16 lg:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
            <div className="flex items-center space-x-4 lg:space-x-12 flex-1 lg:ml-16">
                <h2 className="text-lg lg:text-xl font-bold text-text-primary hidden sm:block">Tableau de bord</h2>

                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Recherche rapide..."
                        className="w-80 bg-gray-50 border-none rounded-full px-12 py-2 text-sm focus:ring-2 focus:ring-primary/20 transition-preset"
                    />
                    <FaSearch className="absolute left-4 top-2.5 text-gray-400" />
                </div>
            </div>

            <div className="flex items-center space-x-3 lg:space-x-6">
                <button className="relative p-2 text-gray-400 hover:text-primary transition-preset hidden sm:block">
                    <FaBell size={20} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block"></div>

                <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-bold text-text-primary leading-none">{user?.nom || 'Utilisateur'}</p>
                        <p className="text-[10px] text-text-secondary font-medium mt-1 uppercase tracking-wider">
                            {user?.role === 'ADMIN' ? 'Administrateur' : 'Gestionnaire'}
                        </p>
                    </div>
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary">
                        <FaUserCircle size={28} className="lg:hidden" />
                        <FaUserCircle size={32} className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
